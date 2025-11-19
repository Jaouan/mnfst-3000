"use client";

import { ManifestDiff } from "@/components/manifest/comparator/ManifestDiff";
import { useManifestsStore } from "@/stores/useManifestsStore";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

export default function DiffPage() {
	const {
		urlA,
		urlB,
		setUrlA,
		setUrlB,
		manifestA,
		manifestB,
		loadingA,
		loadingB,
		error,
		diff,
	} = useManifestsStore();

	const [localUrlA, setLocalUrlA] = useState(urlA);
	const [localUrlB, setLocalUrlB] = useState(urlB);

	useEffect(() => {
		setLocalUrlA(urlA);
	}, [urlA]);

	useEffect(() => {
		setLocalUrlB(urlB);
	}, [urlB]);

	useEffect(() => {
		const state = useManifestsStore.getState();
		if (state.urlA && !state.manifestA) state.fetchManifestA();
		if (state.urlB && !state.manifestB) state.fetchManifestB();
	}, []);

	return (
		<div className="container mx-auto py-8 px-4 max-w-7xl space-y-8">
			<div className="space-y-2">
				<h1 className="text-3xl font-semibold tracking-tight">
					Manifest comparator
				</h1>
				<p className="text-muted-foreground">
					Compare two manifests to identify differences between your
					environments.
				</p>
			</div>

			<Card className="p-0 grid grid-cols-1 md:grid-cols-2 gap-0">
				<div className="p-6 flex flex-col gap-2 md:border-r max-md:border-b border-dashed">
					<div className="flex items-center justify-between">
						<label htmlFor="url-a" className="text-sm font-medium">
							Manifest A
						</label>
						{loadingA && (
							<Badge variant="secondary" className="text-xs">
								Loading...
							</Badge>
						)}
					</div>
					<Input
						id="url-a"
						value={localUrlA}
						onChange={(e) => setLocalUrlA(e.target.value)}
						onBlur={() => {
							if (localUrlA !== urlA) setUrlA(localUrlA);
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter" && localUrlA !== urlA) {
								setUrlA(localUrlA);
							}
						}}
						placeholder="/manifest-a.json"
						className="font-mono text-sm"
					/>
					{!!diff && (
						<p className="text-xs text-muted-foreground tabular-nums">
							{diff.totalRoutesA} routes,{" "}
							{manifestA ? Object.keys(manifestA.modules).length : 0} modules
						</p>
					)}
				</div>
				<div className="p-6 flex flex-col gap-2">
					<div className="flex items-center justify-between">
						<label htmlFor="url-b" className="text-sm font-medium">
							Manifest B
						</label>
						{loadingB && (
							<Badge variant="secondary" className="text-xs">
								Loading...
							</Badge>
						)}
					</div>
					<Input
						id="url-b"
						value={localUrlB}
						onChange={(e) => setLocalUrlB(e.target.value)}
						onBlur={() => {
							if (localUrlB !== urlB) setUrlB(localUrlB);
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter" && localUrlB !== urlB) {
								setUrlB(localUrlB);
							}
						}}
						placeholder="/manifest-b.json"
						className="font-mono text-sm"
					/>
					{!!diff && (
						<p className="text-xs text-muted-foreground tabular-nums">
							{diff.totalRoutesB} routes,{" "}
							{manifestB ? Object.keys(manifestB.modules).length : 0} modules
						</p>
					)}
				</div>
			</Card>

			{error && (
				<Alert variant="destructive">
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			{(loadingA || loadingB) && !error && (
				<div className="space-y-4">
					<Skeleton className="h-32 w-full" />
					<Skeleton className="h-64 w-full" />
				</div>
			)}

			<ManifestDiff manifestA={manifestA} manifestB={manifestB} diff={diff} />
		</div>
	);
}
