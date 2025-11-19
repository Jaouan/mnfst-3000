import { Badge } from "@/components/ui/badge";
import { RouteComparison } from "@/lib/manifest/manifest";

type UniqueRoutesProps = {
	routes: RouteComparison[];
	side: "A" | "B";
};

export const UniqueRoutes = ({ routes, side }: UniqueRoutesProps) => {
	if (routes.length === 0) return null;

	const config =
		side === "A"
			? {
					colorClass: "text-blue-700 dark:text-blue-400",
					bgClass: "bg-blue-50 dark:bg-blue-950/30",
					borderClass: "border-blue-200 dark:border-blue-800",
					borderLeftClass: "border-blue-500 dark:border-blue-600",
					label: "A",
				}
			: {
					colorClass: "text-purple-700 dark:text-purple-400",
					bgClass: "bg-purple-50 dark:bg-purple-950/30",
					borderClass: "border-purple-200 dark:border-purple-800",
					borderLeftClass: "border-purple-500 dark:border-purple-600",
					label: "B",
				};

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center gap-3">
				<h2 className="text-lg font-semibold">Routes only in {config.label}</h2>
				<Badge
					variant="outline"
					className={`${config.bgClass} ${config.colorClass} ${config.borderClass}`}
				>
					{routes.length}
				</Badge>
			</div>
			<div className="space-y-4 flex flex-col">
				{routes.map((route) => (
					<div
						key={route.path}
						className={`border-l-2 ${config.borderLeftClass} pl-4 py-3`}
					>
						<div className="font-mono text-sm font-medium wrap-anywhere">
							{route.path}
						</div>
						{route.modules.length > 0 && (
							<div className="text-xs text-muted-foreground mt-2 wrap-anywhere">
								Modules:{" "}
								{route.modules
									.map((m) => (typeof m === "string" ? m : JSON.stringify(m)))
									.join(", ")}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};
