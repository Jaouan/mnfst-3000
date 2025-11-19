import { DiffStats } from "@/lib/manifest/manifest";

type DiffSummaryProps = {
	diff: DiffStats;
};

export const DiffSummary = ({ diff }: DiffSummaryProps) => {
	const stats = [
		{
			value: diff.identicalRoutes.length,
			label: "Identical routes",
			colorClass: "text-emerald-600 dark:text-emerald-400",
			bgClass: "bg-emerald-50 dark:bg-emerald-950/30",
		},
		{
			value: diff.differentRoutes.length,
			label: "Different routes",
			colorClass: "text-amber-600 dark:text-amber-400",
			bgClass: "bg-amber-50 dark:bg-amber-950/30",
		},
		{
			value: diff.onlyInA.length,
			label: "Only in A",
			colorClass: "text-blue-600 dark:text-blue-400",
			bgClass: "bg-blue-50 dark:bg-blue-950/30",
		},
		{
			value: diff.onlyInB.length,
			label: "Only in B",
			colorClass: "text-purple-600 dark:text-purple-400",
			bgClass: "bg-purple-50 dark:bg-purple-950/30",
		},
	];

	return (
		<div className="p-6">
			<h2 className="text-lg font-semibold mb-6">Differences Summary</h2>
			<div className="flex flex-wrap [&>div]:min-w-48 gap-4">
				{stats.map((stat, index) => (
					<div
						key={index}
						className={`${stat.bgClass} rounded-lg p-4 border border-border/40 transition-colors`}
					>
						<div
							className={`text-3xl font-bold tabular-nums ${stat.colorClass}`}
						>
							{stat.value}
						</div>
						<div className="text-xs text-muted-foreground mt-1.5 font-medium">
							{stat.label}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
