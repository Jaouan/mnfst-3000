import { cn, PropsWithStyle } from "@/lib/utils";
import { CircleDashed } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

export const HeaderLogo: FC<PropsWithStyle> = ({ className }) => (
	<Link
		href="/"
		className={cn(
			"cursor-pointer flex items-center justify-start gap-3 text-lg w-full font-bold text-nowrap",
			className,
		)}
	>
		<CircleDashed className="size-6!" />
		<div className="group-data-[state=collapsed]:hidden">mnfst</div>
	</Link>
);
