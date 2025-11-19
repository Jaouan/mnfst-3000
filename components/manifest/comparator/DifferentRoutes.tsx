import { RouteComparison } from "@/lib/manifest/manifest";
import { renderValue } from "./format";
import { Badge } from "@/components/ui/badge";

type DifferentRoutesProps = {
	routes: RouteComparison[];
};

export const DifferentRoutes = ({ routes }: DifferentRoutesProps) => {
	if (routes.length === 0) return null;

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center gap-3">
				<h2 className="text-lg font-semibold">Different routes</h2>
				<Badge
					variant="outline"
					className="bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800"
				>
					{routes.length}
				</Badge>
			</div>
			<div className="space-y-4">
				{routes.map((route) => (
					<div
						key={route.path}
						className="border-l-2 border-amber-500 dark:border-amber-600 pl-4 py-3 rounded-r-md"
					>
						<div className="font-mono text-sm font-medium mb-3">
							{route.path}
						</div>
						<div className="space-y-3">
							{route.differences?.map((diff) => (
								<div key={diff.field} className="space-y-2">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
										<div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-md p-3">
											<div className="text-xs font-medium text-red-600 dark:text-red-400 mb-1 uppercase">
												{diff.field} A
											</div>
											<pre className="whitespace-pre-wrap text-xs text-red-900 dark:text-red-200 font-mono">
												{renderValue(diff.valueA)}
											</pre>
										</div>
										<div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-md p-3">
											<div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-1 uppercase">
												{diff.field} B
											</div>
											<pre className="whitespace-pre-wrap text-xs text-emerald-900 dark:text-emerald-200 font-mono">
												{renderValue(diff.valueB)}
											</pre>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
