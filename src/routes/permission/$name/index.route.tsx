import { req } from "@/lib/api";
import useSsshStore from "@/lib/store/sssh.store";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { ReadPermissionDto } from "sssh-library";

import { lazy } from "react";

const PermissionDetailForm = lazy(
	() => import("@/components/custom-ui/permission/permission-detail-form"),
);

export const Route = createFileRoute("/permission/$name/")({
	beforeLoad: () => {
		useSsshStore.getState().setTitle("");
	},
	loader: async ({ params, context: { queryClient } }) => {
		const permissionQueryOptions = queryOptions({
			queryKey: ["permission", String(params.name)],
			queryFn: () => req<ReadPermissionDto>(`permission/${params.name}`, "get"),
		});

		return await queryClient.ensureQueryData(permissionQueryOptions);
	},
	component: () => <PermissionDetailForm />,
});
