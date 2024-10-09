import { req } from "@/lib/api";
import { PAGE_TITLE } from "@/lib/const/page-title.const";
import useSsshStore from "@/lib/store/sssh.store";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { Page, ReadUserDto } from "sssh-library";
import { lazy } from "react";

const UserList = lazy(() => import("@/components/custom-ui/user/user-list"));

export const Route = createFileRoute("/user/")({
	beforeLoad: () => {
		useSsshStore.getState().setTitle(PAGE_TITLE["/user"]);
	},
	validateSearch: (search: Record<string, unknown>) => ({
		page: Number(search.page ?? 1),
		where__email: search.where__email,
		like__name: search.like__name,
	}),
	loaderDeps: ({ search: { page, where__email, like__name } }) => {
		const dto: Record<string, unknown> = {
			page,
			take: 10,
			orderby: "createdAt",
			direction: "desc",
		};

		if (where__email !== "undefined" && where__email !== undefined) {
			dto["where__email"] = String(where__email);
		}
		if (like__name !== "undefined" && like__name !== undefined) {
			dto["like__name"] = String(like__name);
		}

		return dto;
	},
	loader: async ({ deps, context: { queryClient } }) => {
		const usersQueryOptions = queryOptions({
			queryKey: [
				"users",
				String(deps.page),
				String(deps.where__email),
				String(deps.like__name),
			],
			queryFn: () => req<Page<ReadUserDto>>("user", "get", deps),
			staleTime: 3000,
		});

		return await queryClient.ensureQueryData(usersQueryOptions);
	},
	component: () => <UserList />,
});
