import { useEffect, useState } from "react";
import { Page, ReadSeriesDto, ReadTopicDto } from "sssh-library";
import SeriesDataTable from "./series-data-table";
import { Route } from "@/routes/series/index.route";

function SeriesList() {
  const { success, data } = Route.useLoaderData();

  const [series, setSeries] = useState<Page<ReadSeriesDto>>();

  useEffect(() => {
    if (success && data) {
      setSeries(data);
    }
  }, [success, data])


  return (
    <SeriesDataTable series={series} />
  );
}

export default SeriesList;
