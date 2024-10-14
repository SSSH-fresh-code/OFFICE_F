import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import useUserStore from "@/lib/store/user.store";
import { lazy } from "react";

const GuestApp = lazy(() => import("@/components/guest/guest-app"));
const App = lazy(() => import("@/App"));

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	component: Root,
	preloadStaleTime: 0,
});

function Root() {
	const { user, login } = useUserStore();

	return user ? <App /> : <GuestApp login={login} />;
}
