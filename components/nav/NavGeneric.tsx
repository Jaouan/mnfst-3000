import { ChevronRight } from "lucide-react";

import {
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { NavCollapsible } from "./NavCollapsible";
import type { FC, ReactNode } from "react";

type NavGenericProps = {
	title: string;
	items: {
		title: string;
		url: string;
		icon?: ReactNode;
		isActive?: boolean;
		items?: {
			title: string;
			url: string;
		}[];
	}[];
};

export const NavGeneric: FC<NavGenericProps> = ({ title, items }) => (
	<SidebarGroup>
		<SidebarGroupLabel>{title}</SidebarGroupLabel>
		<SidebarMenu>
			<div></div>
			{items.map((item) => (
				<NavCollapsible
					key={item.title}
					asChild
					defaultOpen={item.isActive}
					className="group/collapsible"
					links={item.items?.map((sub) => sub.url)}
				>
					<SidebarMenuItem>
						<CollapsibleTrigger asChild>
							<SidebarMenuButton
								tooltip={item.title}
								className="text-foreground/70 cursor-pointer hover:bg-foreground/5"
							>
								{item.icon && item.icon}
								<span>{item.title}</span>
								<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
							</SidebarMenuButton>
						</CollapsibleTrigger>
						<CollapsibleContent>
							<SidebarMenuSub>
								{item.items?.map((subItem) => (
									<SidebarMenuSubItem key={subItem.title}>
										<SidebarMenuSubButton
											asChild
											className="text-foreground/70"
											hasLink={subItem.url}
										>
											<Link href={subItem.url}>
												<span>{subItem.title}</span>
											</Link>
										</SidebarMenuSubButton>
									</SidebarMenuSubItem>
								))}
							</SidebarMenuSub>
						</CollapsibleContent>
					</SidebarMenuItem>
				</NavCollapsible>
			))}
		</SidebarMenu>
	</SidebarGroup>
);
