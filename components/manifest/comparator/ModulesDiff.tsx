import { Badge } from "@/components/ui/badge";

type ModulesDiffProps = {
	modulesOnlyInA: string[];
	modulesOnlyInB: string[];
};

export const ModulesDiff = ({
	modulesOnlyInA,
	modulesOnlyInB,
}: ModulesDiffProps) => {
	if (modulesOnlyInA.length === 0 && modulesOnlyInB.length === 0) {
		return null;
	}

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center gap-3">
				<h2 className="text-lg font-semibold">Different modules</h2>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{modulesOnlyInA.length > 0 && (
					<div className="space-y-3">
						<div className="flex items-center gap-2">
							<h3 className="text-sm font-medium">Only in A</h3>
							<Badge
								variant="outline"
								className="bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800"
							>
								{modulesOnlyInA.length}
							</Badge>
						</div>
						<ul className="space-y-2">
							{modulesOnlyInA.map((module) => (
								<li
									key={module}
									className="text-sm font-mono bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 px-3 py-2 rounded-md text-blue-900 dark:text-blue-200"
								>
									{module}
								</li>
							))}
						</ul>
					</div>
				)}
				{modulesOnlyInB.length > 0 && (
					<div className="space-y-3">
						<div className="flex items-center gap-2">
							<h3 className="text-sm font-medium">Only in B</h3>
							<Badge
								variant="outline"
								className="bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800"
							>
								{modulesOnlyInB.length}
							</Badge>
						</div>
						<ul className="space-y-2">
							{modulesOnlyInB.map((module) => (
								<li
									key={module}
									className="text-sm font-mono bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/50 px-3 py-2 rounded-md text-purple-900 dark:text-purple-200"
								>
									{module}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};
