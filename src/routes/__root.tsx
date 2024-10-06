import { createRootRouteWithContext } from "@tanstack/react-router";
import App from "@/App";
import useUserStore from "@/lib/store/user.store";
import GuestApp from "@/components/guest/guest-app";
import { QueryClient } from "@tanstack/react-query";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	component: Root,
});

function Root() {
	const { user, login } = useUserStore();

	return user ? <App /> : <GuestApp login={login} />;
}
