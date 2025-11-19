import { useMemo } from "react";
import { DiffSummary } from "./DiffSummary";
import { DifferentRoutes } from "./DifferentRoutes";
import { UniqueRoutes } from "./UniqueRoutes";
import { ModulesDiff } from "./ModulesDiff";
import { Manifest } from "@/lib/manifest/manifest";
import { analyzeDiff } from "@/lib/manifest/manifest-compare";

type ManifestDiffProps = {
	manifestA: Manifest | null;
	manifestB: Manifest | null;
	diff?: ReturnType<typeof analyzeDiff> | null;
};

export const ManifestDiff = ({
	manifestA,
	manifestB,
	diff: externalDiff,
}: ManifestDiffProps) => {
	const diff = useMemo(() => {
		if (externalDiff) return externalDiff;
		return analyzeDiff(manifestA, manifestB);
	}, [manifestA, manifestB, externalDiff]);

	if (!manifestA || !manifestB) {
		return null;
	}

	return (
		<div className="space-y-6">
			<DiffSummary diff={diff} />
			<DifferentRoutes routes={diff.differentRoutes} />
			<UniqueRoutes routes={diff.onlyInA} side="A" />
			<UniqueRoutes routes={diff.onlyInB} side="B" />
			<ModulesDiff
				modulesOnlyInA={diff.modulesOnlyInA}
				modulesOnlyInB={diff.modulesOnlyInB}
			/>
		</div>
	);
};
