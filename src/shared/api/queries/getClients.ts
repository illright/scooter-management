import type { QueryOptions } from "@tanstack/react-query";

interface Client {
	id: string;
	registeredAt: string;
	totalRides: number;
	currentScooter: string | null;
}

export const getClientsQuery = {
	queryKey: ["clients"],
	queryFn: () => {
		return [
			{
				id: "1",
				registeredAt: "2023-01-15T10:00:00Z",
				totalRides: 5,
				currentScooter: "Мария",
			},
			{
				id: "2",
				registeredAt: "2023-02-20T11:30:00Z",
				totalRides: 10,
				currentScooter: "Алексей",
			},
			{
				id: "3",
				registeredAt: "2023-03-05T14:45:00Z",
				totalRides: 2,
				currentScooter: null,
			},
			{
				id: "4",
				registeredAt: "2023-04-10T09:15:00Z",
				totalRides: 8,
				currentScooter: null,
			},
			{
				id: "5",
				registeredAt: "2023-05-25T16:20:00Z",
				totalRides: 12,
				currentScooter: "Екатерина",
			},
		] satisfies Array<Client>;
	},
} satisfies QueryOptions;
