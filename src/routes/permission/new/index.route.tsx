import useSsshStore from "@/lib/store/sssh.store";
import { createFileRoute } from "@tanstack/react-router";
import { lazy } from "react";

const PermissionNewForm = lazy(
	() => import("@/components/custom-ui/permission/permission-new-form"),
);

export const Route = createFileRoute("/permission/new/")({
	beforeLoad: () => {
		useSsshStore.getState().setTitle("");
	},
	component: () => <PermissionNewForm />,
});
