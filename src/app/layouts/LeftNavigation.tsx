import {
	AssignmentRounded,
	BikeScooterRounded,
	PeopleRounded,
} from "@mui/icons-material";
import {
	Box,
	Divider,
	Drawer,
	FormControl,
	InputLabel,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Link as MUILink,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";
import {
	Outlet,
	type RegisteredRouter,
	createLink,
	useLocation,
} from "@tanstack/react-router";
import { type ComponentProps, type ReactNode, use } from "react";
import { type Environment, EnvironmentContext } from "#/shared/api";

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
	const { environment, setEnvironment } = use(EnvironmentContext) ?? {};

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

					<div className="mt-auto">
						<Divider sx={{ mb: 2 }} />
						<Box sx={{ px: 2, pb: 6 }}>
							<Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
								Окружение
							</Typography>
							<FormControl fullWidth size="small">
								<InputLabel id="environment-select-label">Среда</InputLabel>
								<Select
									labelId="environment-select-label"
									value={environment}
									label="Среда"
									onChange={(event) => setEnvironment?.(event.target.value as Environment)}
								>
									<MenuItem value="stage">Stage</MenuItem>
									<MenuItem value="prod">Production</MenuItem>
								</Select>
							</FormControl>
						</Box>
					</div>
				</div>
			</Drawer>

			<main className="p-4 grow">
				<Outlet />
			</main>
		</div>
	);
}
