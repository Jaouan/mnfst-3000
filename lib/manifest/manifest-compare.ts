import isEqual from "fast-deep-equal";
import type { Route, Manifest, RouteComparison, DiffStats } from "./manifest";

export const flattenRoutes = (
	routes: Route[],
	parentPath = "",
): Map<string, Route> => {
	const flattened = new Map<string, Route>();

	for (const route of routes) {
		const fullPath =
			parentPath +
			(parentPath && !route.path.startsWith("/") ? "/" : "") +
			route.path;
		flattened.set(fullPath, route);

		if (route.routes?.length) {
			for (const [path, nestedRoute] of flattenRoutes(route.routes, fullPath)) {
				flattened.set(path, nestedRoute);
			}
		}
	}

	return flattened;
};

export const extractAllModules = (routes: Route[]): Set<string> => {
	const modules = new Set<string>();

	const traverse = (route: Route) => {
		route.modules?.forEach((mod) => {
			modules.add(typeof mod === "string" ? mod : JSON.stringify(mod));
		});
		route.routes?.forEach(traverse);
	};

	routes.forEach(traverse);
	return modules;
};

export const compareRoutes = (
	routeA: Route,
	routeB: Route,
): {
	identical: boolean;
	differences: { field: string; valueA: unknown; valueB: unknown }[];
} => {
	const excludedFields = new Set(["routes"]);
	const allKeys = new Set([...Object.keys(routeA), ...Object.keys(routeB)]);

	const differences = Array.from(allKeys)
		.filter((key) => !excludedFields.has(key))
		.map((key) => ({
			key,
			valueA: routeA[key as keyof Route],
			valueB: routeB[key as keyof Route],
		}))
		.filter(({ valueA, valueB }) => !isEqual(valueA, valueB))
		.map(({ key, valueA, valueB }) => ({
			field: key,
			valueA,
			valueB,
		}));

	return {
		identical: differences.length === 0,
		differences,
	};
};

export const analyzeDiff = (
	manifestA: Manifest | null,
	manifestB: Manifest | null,
): DiffStats => {
	const routesA = flattenRoutes(manifestA?.routes || []);
	const routesB = flattenRoutes(manifestB?.routes || []);
	const allPaths = new Set([...routesA.keys(), ...routesB.keys()]);

	const identicalRoutes: RouteComparison[] = [];
	const differentRoutes: RouteComparison[] = [];
	const onlyInA: RouteComparison[] = [];
	const onlyInB: RouteComparison[] = [];

	for (const path of allPaths) {
		const routeA = routesA.get(path);
		const routeB = routesB.get(path);

		if (routeA && routeB) {
			const { identical, differences } = compareRoutes(routeA, routeB);
			const routeComparison: RouteComparison = {
				path,
				inBoth: true,
				inA: true,
				inB: true,
				identical,
				modules: routeA.modules || [],
				differences,
			};
			(identical ? identicalRoutes : differentRoutes).push(routeComparison);
		} else if (routeA) {
			onlyInA.push({
				path,
				inBoth: false,
				inA: true,
				inB: false,
				identical: false,
				modules: routeA.modules || [],
			});
		} else if (routeB) {
			onlyInB.push({
				path,
				inBoth: false,
				inA: false,
				inB: true,
				identical: false,
				modules: routeB.modules || [],
			});
		}
	}

	const modulesA = new Set(Object.keys(manifestA?.modules || {}));
	const modulesB = new Set(Object.keys(manifestB?.modules || {}));

	return {
		identicalRoutes,
		differentRoutes,
		onlyInA,
		onlyInB,
		modulesOnlyInA: [...modulesA].filter((m) => !modulesB.has(m)),
		modulesOnlyInB: [...modulesB].filter((m) => !modulesA.has(m)),
		totalRoutesA: routesA.size,
		totalRoutesB: routesB.size,
	};
};
