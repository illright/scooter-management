import {
	AssignmentRounded,
	BikeScooterRounded,
	HomeRounded,
	PeopleRounded,
} from "@mui/icons-material";
import {
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Link as MUILink,
} from "@mui/material";
import { Outlet, type RegisteredRouter, createLink, useLocation } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";

const CustomLink = createLink(MUILink);

interface ListItemProps {
	text: string;
	icon: ReactNode;
	href: ComponentProps<typeof CustomLink<RegisteredRouter>>["to"];
}

const drawerWidth = 240;
const mainListItems: Array<ListItemProps> = [
	{ text: "Самокаты", icon: <BikeScooterRounded />, href: "/" },
	{ text: "Клиенты", icon: <PeopleRounded />, href: "/clients" },
	{
		text: "Задачи по обслуживанию",
		icon: <AssignmentRounded />,
		href: "/service-jobs",
	},
];

export function LeftNavigationLayout() {
	const pathname = useLocation({
		select: (location) => location.pathname,
	});

	return (
		<div className="flex">
			<Drawer
				variant="permanent"
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}
			>
				<div className="flex flex-col grow p-1">
					<List>
						{mainListItems.map((item, index) => (
							<ListItem key={index} disablePadding sx={{ display: "block" }}>
								<ListItemButton
									component={CustomLink}
									to={item.href}
									selected={pathname === item.href}
								>
									<ListItemIcon>{item.icon}</ListItemIcon>
									<ListItemText primary={item.text} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</div>
			</Drawer>

			<main className="p-4 grow">
				<Outlet />
			</main>
		</div>
	);
}
