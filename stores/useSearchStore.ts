import { create } from "zustand";

type SearchItem = {
	title: string;
	url: string;
};

type SearchState = {
	items: SearchItem[];
};

export const useSearchStore = create<SearchState>(() => ({
	items: [{ title: "Manifest comparator", url: "/manifest/comparator" }],
}));
