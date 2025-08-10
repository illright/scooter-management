import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import {
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";

const mainListItems = [
	{ text: "Обзор", icon: <HomeRoundedIcon /> },
	{ text: "Самокаты", icon: <AnalyticsRoundedIcon /> },
	{ text: "Клиенты", icon: <PeopleRoundedIcon /> },
	{ text: "Задачи по обслуживанию", icon: <AssignmentRoundedIcon /> },
];

const drawerWidth = 240

export default function Home() {
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
								<ListItemButton selected={index === 1}>
									<ListItemIcon>{item.icon}</ListItemIcon>
									<ListItemText primary={item.text} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</div>
			</Drawer>

			<main className="p-4 grow">

			</main>
		</div>
	);
}
