import { req } from "@/lib/api";
import { PAGE_TITLE } from "@/lib/const/page-title.const";
import useSsshStore from "@/lib/store/sssh.store";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { Page, ReadPostDto } from "sssh-library";
import { lazy } from "react";

const PostList = lazy(() => import("@/components/custom-ui/post/post-list"));

export const Route = createFileRoute("/post/")({
	beforeLoad: () => {
		useSsshStore.getState().setTitle(PAGE_TITLE["/post"]);
	},
	validateSearch: (search: Record<string, unknown>) => ({
		page: Number(search.page ?? 1),
		like__title: search.like__title,
		like__content: search.like__content,
		where__topicId: search.where__topicId
			? Number(search.where__topicId)
			: undefined,
		where__seriesId: search.where__seriesId
			? Number(search.where__seriesId)
			: undefined,
		where__authorName: search.where__authorName
			? search.where__authorName
			: undefined,
	}),
	loaderDeps: ({
		search: {
			page,
			like__title,
			like__content,
			where__authorName,
			where__topicId,
			where__seriesId,
		},
	}) => {
		const dto: Record<string, unknown> = {
			page,
			take: 10,
			orderby: "createdAt",
			direction: "desc",
		};

		if (
			!Number.isNaN(Number(where__seriesId)) &&
			String(where__seriesId) !== "NaN" &&
			where__seriesId !== undefined
		) {
			dto["where__seriesId"] = where__seriesId;
		} else if (
			!Number.isNaN(Number(where__topicId)) &&
			String(where__topicId) !== "NaN" &&
			where__topicId !== undefined
		) {
			dto["where__topicId"] = where__topicId;
		}

		if (where__authorName !== "undefined" && where__authorName !== undefined) {
			dto["where__authorName"] = String(where__authorName);
		}
		if (like__title !== "undefined" && like__title !== undefined) {
			dto["like__title"] = String(like__title);
		}
		if (like__content !== "undefined" && like__content !== undefined) {
			dto["like__content"] = String(like__content);
		}

		return dto;
	},
	loader: async ({ deps, context: { queryClient } }) => {
		const seriesQueryOptions = queryOptions({
			queryKey: [
				"posts",
				String(deps.page),
				String(deps.like__title),
				String(deps.like__content),
				String(deps.where__authorName),
				String(deps.where__seriesId),
				String(deps.where__topicId),
			],
			queryFn: () => req<Page<ReadPostDto>>("post", "get", deps),
			staleTime: 3000,
		});

		return await queryClient.ensureQueryData(seriesQueryOptions);
	},
	component: () => <PostList />,
});
