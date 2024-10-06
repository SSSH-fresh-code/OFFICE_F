import UserPermissionManage from "@/components/custom-ui/user/user-permission-manage";
import { req } from "@/lib/api";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ReadPermissionDto, ReadUserDto } from "sssh-library";

export const Route = createFileRoute("/user/$id/permission/")({
	loader: async ({ params, context: { queryClient } }) => {
		const userQueryOptions = queryOptions({
			queryKey: ["user", String(params.id)],
			queryFn: () => req<ReadUserDto>(`user/${params.id}`, "get"),
			staleTime: 0,
		});

		const user = await queryClient.ensureQueryData(userQueryOptions);

		const permQueryOptions = queryOptions({
			queryKey: ["permissions"],
			queryFn: () => req<ReadPermissionDto[]>(`permission`, "get"),
			staleTime: Infinity,
		});

		const permission = await queryClient.ensureQueryData(permQueryOptions);

		if (
			user &&
			user.success &&
			user.data &&
			permission &&
			permission.success &&
			permission.data
		) {
			return {
				user: {
					id: user.data.id,
					permissions: user.data.permissions,
				},
				permission: permission.data,
			};
		}

		throw new Error("");
	},
	component: () => <UserPermissionManage />,
});
