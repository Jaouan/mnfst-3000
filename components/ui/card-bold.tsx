import * as React from "react";

import { cn } from "@/lib/utils";

function CardBold({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card"
			className={
				"bg-foreground/5 backdrop-blur-2xl flex flex-col p-2 rounded-2xl border shadow-sm"
			}
		>
			<div
				data-slot="card"
				className={cn(
					"bg-card text-card-foreground flex flex-col gap-6 rounded-lg border py-6 overflow-hidden",
					className,
				)}
				{...props}
			/>
		</div>
	);
}

export { CardBold };
