import useUserStore from "@/lib/store/user.store";
import { createFileRoute } from "@tanstack/react-router";
import { lazy } from "react";

const GuestApp = lazy(() => import("@/components/guest/guest-app"));

export const Route = createFileRoute("/login/")({
	component: () => {
		const { user, login } = useUserStore();

		if (user) location.href = "/";

		return <GuestApp login={login} />;
	},
});
