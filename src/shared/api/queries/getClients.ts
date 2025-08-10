import type { QueryOptions } from "@tanstack/react-query";

export const getClientsQuery = {
	queryKey: ["clients"],
	queryFn: () => {
		throw new Error("Not implemented");
	},
} satisfies QueryOptions;
