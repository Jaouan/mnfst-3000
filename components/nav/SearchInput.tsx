"use client";

import { FC, useEffect, useState } from "react";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "../ui/command";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Kbd, KbdKey } from "../ui/shadcn-io/kbd";
import { cn, PropsWithStyle } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSearchStore } from "@/stores/useSearchStore";
import { redirect } from "next/navigation";

export const SearchInput: FC<PropsWithStyle> = ({ className }) => {
	const isMobile = useIsMobile();
	const [open, setOpen] = useState(false);
	const items = useSearchStore((state) => state.items);

	useEffect(() => {
		if (isMobile) return;
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};
		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, [isMobile]);

	if (isMobile) return null;

	return (
		<>
			<div
				className={cn("relative w-full", className)}
				onFocus={() => setOpen(true)}
			>
				<Search className="absolute start-2 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
				<Input name="search-input" placeholder="Search" className="px-8" />
				<Kbd className="pointer-events-none absolute end-2 top-2.5 h-4">
					<KbdKey aria-label="Meta">⌘</KbdKey>
					<KbdKey>K</KbdKey>
				</Kbd>
			</div>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						{items.map((item) => (
							<CommandItem
								key={item.url}
								onSelect={() => {
									setOpen(false);
									redirect(item.url);
								}}
							>
								{item.title}
							</CommandItem>
						))}
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
};
