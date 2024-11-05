import useUserStore from "@/lib/store/user.store";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { lazy } from "react";

const App = lazy(() => import("@/App"));

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	component: () => {
		const { user } = useUserStore();

		return user ? (
			<App />
		) : (
			<>
				<Outlet />
			</>
		);
	},
	preloadStaleTime: 0,
});
