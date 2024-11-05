import MainPage from "@/components/custom-ui/main/main-page";
import { readMainPageApi, readMainPageKey } from "@/lib/api/main-page-api";
import useSsshStore from "@/lib/store/sssh.store";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    useSsshStore.getState().setTitle("");
  },
  loader: async ({ context: { queryClient } }) => {
    const keys = readMainPageKey();

    const mainPageQueryOptions = queryOptions({
      queryKey: keys,
      queryFn: () => readMainPageApi(),
      staleTime: 0,
    });

    return await queryClient.fetchQuery(mainPageQueryOptions);
  },
  component: () => <MainPage />,
});
