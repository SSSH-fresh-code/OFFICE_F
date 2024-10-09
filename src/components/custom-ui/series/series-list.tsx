import { lazy, useEffect, useState } from "react";
import type { Page, ReadSeriesDto } from "sssh-library";
import { Route } from "@/routes/series/index.route";

const SeriesDataTable = lazy(() => import("./series-data-table"));

function SeriesList() {
	const { success, data } = Route.useLoaderData();

	const [series, setSeries] = useState<Page<ReadSeriesDto>>();

	useEffect(() => {
		if (success && data) {
			setSeries(data);
		}
	}, [success, data]);

	return <SeriesDataTable series={series} />;
}

export default SeriesList;
