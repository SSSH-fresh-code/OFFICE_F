import { req } from "@/lib/api";
import { PAGE_TITLE } from "@/lib/const/page-title.const";
import useSsshStore from "@/lib/store/sssh.store";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { ReadSeriesDto } from "sssh-library";
import { lazy } from "react";

const SeriesNewForm = lazy(
	() => import("@/components/custom-ui/series/series-new-form"),
);

export const Route = createFileRoute("/series/new/")({
	beforeLoad: () => {
		useSsshStore.getState().setTitle(PAGE_TITLE["/series/new"]);
	},
	loader: async ({ context: { queryClient } }) => {
		const topicQueryOptions = queryOptions({
			queryKey: ["topicForSelect"],
			queryFn: () =>
				req<Pick<ReadSeriesDto, "name" | "id">[]>(`topic/all`, "get"),
		});

		return await queryClient.ensureQueryData(topicQueryOptions);
	},
	component: () => <SeriesNewForm />,
});
