import { Route } from "@/routes/topic/index.route";
import { useEffect, useState } from "react";
import { Page, ReadTopicDto } from "sssh-library";
import TopicDataTable from "./topic-data-table";

function TopicList() {
  const { success, data } = Route.useLoaderData();

  const [topics, setTopics] = useState<Page<ReadTopicDto>>();

  useEffect(() => {
    if (success && data) {
      setTopics(data);
    }
  }, [success, data])


  return (
    <TopicDataTable topics={topics} />
  );
}

export default TopicList;
