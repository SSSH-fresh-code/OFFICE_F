import SeriesDetailForm from "@/components/custom-ui/series/series-detail-form";
import { req } from "@/lib/api";
import useSsshStore from "@/lib/store/sssh.store";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ReadSeriesDto } from "sssh-library";

export const Route = createFileRoute("/series/$name/")({
	beforeLoad: () => {
		useSsshStore.getState().setTitle("");
	},
	loader: async ({ params, context: { queryClient } }) => {
		const seriesQueryOptions = queryOptions({
			queryKey: ["series", String(params.name)],
			queryFn: () => req<ReadSeriesDto>(`series/${params.name}`, "get"),
		});

		const topicQueryOptions = queryOptions({
			queryKey: ["topicForSelect"],
			queryFn: () =>
				req<Pick<ReadSeriesDto, "name" | "id">[]>(`topic/all`, "get"),
		});

		const series = await queryClient.ensureQueryData(seriesQueryOptions);
		const topics = await queryClient.ensureQueryData(topicQueryOptions);

		return { series, topics };
	},
	component: () => <SeriesDetailForm />,
});
