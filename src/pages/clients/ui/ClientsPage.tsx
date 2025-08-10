import { MoreHoriz } from "@mui/icons-material";
import { Drawer, IconButton, Menu, MenuItem } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getClientsQuery } from "#/shared/api";

export function ClientsPage() {
	const { data: scooters } = useQuery(getClientsQuery);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const columns = useMemo(
		() =>
			staticColumns.concat({
				field: "actions",
				headerName: "Действия",
				minWidth: 100,
				align: "right",
				renderCell: () => (
					<Actions onDirectToScooter={() => setIsDrawerOpen(true)} />
				),
			}),
		[],
	);

	return (
		<>
			<DataGrid
				checkboxSelection
				disableRowSelectionOnClick
				rows={scooters}
				columns={columns}
				disableColumnResize
			/>
			<Drawer
				anchor="right"
				open={isDrawerOpen}
				onClose={() => setIsDrawerOpen(false)}
			>
				TODO
			</Drawer>
		</>
	);
}

const staticColumns: GridColDef[] = [
	{ field: "id", headerName: "ID клиента", flex: 1, minWidth: 200 },
	{
		field: "registeredAt",
		headerName: "Время регистрации",
		minWidth: 200,
		renderCell: (params) => new Date(params.value).toLocaleString(),
	},
	{
		field: "totalRides",
		headerName: "Всего поездок",
		minWidth: 150,
	},
	{
		field: "currentScooter",
		headerName: "Текущий самокат",
		minWidth: 150,
	},
];

function Actions({ onDirectToScooter }: { onDirectToScooter: () => void }) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<IconButton size="small" aria-label="Действия" onClick={handleClick}>
				<MoreHoriz />
			</IconButton>
			<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
				<MenuItem
					onClick={() => {
						handleClose();
						onDirectToScooter();
					}}
				>
					Направить к самокату…
				</MenuItem>
				<MenuItem onClick={handleClose}>Забанить</MenuItem>
			</Menu>
		</>
	);
}
