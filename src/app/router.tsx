import {
	RouterProvider,
	createRootRoute,
	createRoute,
	createRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import * as TanStackQueryProvider from "./integrations/tanstack-query.tsx";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ClientsPage } from "#/pages/clients/index.ts";
import { ScootersPage } from "#/pages/scooters/index.ts";
import { ServiceJobsPage } from "#/pages/service-jobs/index.ts";
import { LeftNavigationLayout } from "./layouts/LeftNavigation.tsx";

const rootRoute = createRootRoute({
	component: () => (
		<>
			<LeftNavigationLayout />
			<TanStackRouterDevtools />
			<ReactQueryDevtools buttonPosition="bottom-right" />
		</>
	),
});

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: ScootersPage,
});

const clientsRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/clients",
	component: ClientsPage,
});

const serviceJobsRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/service-jobs",
	component: ServiceJobsPage,
});

const routeTree = rootRoute.addChildren([
	indexRoute,
	clientsRoute,
	serviceJobsRoute,
]);

const TanStackQueryProviderContext = TanStackQueryProvider.getContext();
const router = createRouter({
	routeTree,
	context: {
		...TanStackQueryProviderContext,
	},
	defaultPreload: "intent",
	scrollRestoration: true,
	defaultStructuralSharing: true,
	defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

export function App() {
	return (
		<TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
			<RouterProvider router={router} />
		</TanStackQueryProvider.Provider>
	);
}
