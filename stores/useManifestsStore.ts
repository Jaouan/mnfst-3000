import { create } from "zustand";
import { persist } from "zustand/middleware";
import { analyzeDiff } from "@/lib/manifest/manifest-compare";
import type { Manifest } from "@/lib/manifest/manifest";

type DiffResult = ReturnType<typeof analyzeDiff>;

type ManifestsState = {
	urlA: string;
	urlB: string;
	manifestA: Manifest | null;
	manifestB: Manifest | null;
	diff: DiffResult | null;
	loadingA: boolean;
	loadingB: boolean;
	error: string | null;
	setUrlA: (url: string) => void;
	setUrlB: (url: string) => void;
	fetchManifestA: () => Promise<void>;
	fetchManifestB: () => Promise<void>;
};

const fetchManifest = async (
	url: string,
	side: "A" | "B",
	set: (
		partial:
			| Partial<ManifestsState>
			| ((state: ManifestsState) => Partial<ManifestsState>),
	) => void,
	getOtherManifest: () => Manifest | null,
) => {
	if (!url) return;

	const loadingKey = `loading${side}` as const;
	const manifestKey = `manifest${side}` as const;

	set({ [loadingKey]: true, error: null } as Partial<ManifestsState>);

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Failed to fetch manifest ${side}`);
		}
		const data = await response.json();

		set({
			[manifestKey]: data,
			[loadingKey]: false,
			diff:
				side === "A"
					? analyzeDiff(data, getOtherManifest())
					: analyzeDiff(getOtherManifest(), data),
		} as Partial<ManifestsState>);
	} catch (err) {
		set({
			error: err instanceof Error ? err.message : "An error occurred",
			[loadingKey]: false,
		} as Partial<ManifestsState>);
	}
};

export const useManifestsStore = create<ManifestsState>()(
	persist(
		(set, get) => ({
			urlA: "",
			urlB: "",
			manifestA: null,
			manifestB: null,
			diff: null,
			loadingA: false,
			loadingB: false,
			error: null,

			setUrlA: (url) => {
				set({ urlA: url });
				get().fetchManifestA();
			},

			setUrlB: (url) => {
				set({ urlB: url });
				get().fetchManifestB();
			},

			fetchManifestA: () =>
				fetchManifest(get().urlA, "A", set, () => get().manifestB),
			fetchManifestB: () =>
				fetchManifest(get().urlB, "B", set, () => get().manifestA),
		}),
		{
			name: "manifest-storage",
			partialize: (state) => ({ urlA: state.urlA, urlB: state.urlB }),
		},
	),
);
