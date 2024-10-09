import { req } from "@/lib/api";
import useSsshStore from "@/lib/store/sssh.store";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { ReadUserDto } from "sssh-library";
import { lazy } from "react";

const UserDetailForm = lazy(
	() => import("@/components/custom-ui/user/user-detail-form"),
);

export const Route = createFileRoute("/user/$id/")({
	beforeLoad: () => {
		useSsshStore.getState().setTitle("");
	},
	loader: async ({ params, context: { queryClient } }) => {
		const userQueryOptions = queryOptions({
			queryKey: ["user", String(params.id)],
			queryFn: () => req<ReadUserDto>(`user/${params.id}`, "get"),
			staleTime: 0,
		});

		const user = await queryClient.ensureQueryData(userQueryOptions);

		if (user.success) return user.data as ReadUserDto;
		else throw new Error("");
	},
	component: () => <UserDetailForm />,
});
