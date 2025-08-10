import type { QueryOptions } from "@tanstack/react-query";

export const getServiceJobsQuery = {
	queryKey: ["service-jobs"],
	queryFn: () => {
		throw new Error("Not implemented");
	},
} satisfies QueryOptions;
