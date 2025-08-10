import { MoreHoriz } from "@mui/icons-material";
import { Chip, IconButton } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { getScootersQuery } from "#/shared/api/index.ts";

export function ScootersPage() {
	const { data: scooters } = useQuery(getScootersQuery);

	return (
		<DataGrid
			checkboxSelection
			disableRowSelectionOnClick
			rows={scooters}
			columns={columns}
			disableColumnResize
		/>
	);
}

type ScooterStatus = "В поездке" | "Доступен" | "Оффлайн";

function renderStatus(status: ScooterStatus) {
	const colors: { [index: string]: "success" | "default" } = {
		"В поездке": "success",
		Доступен: "success",
		Оффлайн: "default",
	};

	return <Chip label={status} color={colors[status]} size="small" />;
}

// Dummy data for an application that manages rental e-scooters across the city
export const columns: GridColDef[] = [
	{ field: "codename", headerName: "Кодовое имя", flex: 1.5, minWidth: 200 },
	{
		field: "status",
		headerName: "Статус",
		flex: 0.5,
		minWidth: 80,
		renderCell: (params) => renderStatus(params.value as ScooterStatus),
	},
	{
		field: "battery",
		headerName: "Заряд",
		valueFormatter: (value) => `${Math.round(value * 100)}%`,
	},
	{
		field: "coordinates",
		headerName: "Координаты",
		minWidth: 150,
		renderCell: (params) => `${params.value[0]}, ${params.value[1]}`,
	},
	{
		field: "lastRideTime",
		headerName: "Время последней поездки",
		minWidth: 200,
		renderCell: (params) => new Date(params.value).toLocaleString(),
	},
	{
		field: "lastMaintenanceTime",
		headerName: "Время последнего обслуживания",
		minWidth: 260,
		renderCell: (params) => new Date(params.value).toLocaleString(),
	},
	{
		field: "model",
		headerName: "Модель",
		minWidth: 150,
	},
	{
		field: "actions",
		headerName: "Действия",
		minWidth: 100,
		align: "right",
		renderCell: () => (
			<IconButton size="small" aria-label="Действия">
				<MoreHoriz />
			</IconButton>
		),
	},
];
