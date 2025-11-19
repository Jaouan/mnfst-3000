export type ModuleConfig = string | Record<string, unknown>;

export type Route = {
	path: string;
	modules?: ModuleConfig[];
	routes?: Route[];
	[key: string]: unknown;
};

export type Manifest = {
	routes?: Route[];
	modules: Record<string, unknown>;
	[key: string]: unknown;
};

export type RouteComparison = {
	path: string;
	inBoth: boolean;
	inA: boolean;
	inB: boolean;
	identical: boolean;
	modules: ModuleConfig[];
	differences?: {
		field: string;
		valueA: unknown;
		valueB: unknown;
	}[];
};

export type DiffStats = {
	identicalRoutes: RouteComparison[];
	differentRoutes: RouteComparison[];
	onlyInA: RouteComparison[];
	onlyInB: RouteComparison[];
	modulesOnlyInA: string[];
	modulesOnlyInB: string[];
	totalRoutesA: number;
	totalRoutesB: number;
};
