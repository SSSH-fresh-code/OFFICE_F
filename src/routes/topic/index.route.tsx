import TopicList from '@/components/custom-ui/topic/topic-list';
import { req } from '@/lib/api'
import { PAGE_TITLE } from '@/lib/const/page-title.const';
import useSsshStore from '@/lib/store/sssh.store';
import { queryOptions } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { Page, ReadTopicDto } from 'sssh-library';

export const Route = createFileRoute('/topic/')({
  beforeLoad: () => {
    useSsshStore.getState().setTitle(PAGE_TITLE["/topic"]);
  },
  validateSearch: (search: Record<string, unknown>) =>
    ({ page: Number(search.page ?? 1), like__name: search.like__name }),
  loaderDeps: ({ search: { page, like__name } }) => {
    const dto: Record<string, unknown> = {
      page,
      take: 10,
      orderby: "createdAt",
      direction: "desc"
    }

    if (like__name !== "undefined" && like__name !== undefined) {
      dto["like__name"] = String(like__name);
    }

    return dto;
  },
  loader: async ({ deps, context: { queryClient } }) => {
    const postsQueryOptions = queryOptions({
      queryKey: ['topics', String(deps.page)],
      queryFn: () => req<Page<ReadTopicDto>>('topic', 'get', deps),
      staleTime: 3000
    });

    return await queryClient.ensureQueryData(postsQueryOptions);
  },
  component: () => <TopicList />,
})


