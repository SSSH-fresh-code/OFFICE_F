import SeriesList from '@/components/custom-ui/series/series-list'
import { req } from '@/lib/api';
import { queryOptions } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { Page, ReadSeriesDto } from 'sssh-library';

export const Route = createFileRoute('/series/')({
  validateSearch: (search: Record<string, unknown>) =>
  ({
    page: Number(search.page ?? 1),
    like__name: search.like__name,
    where__topicId: search.where__topicId ? Number(search.where__topicId) : undefined
  }),
  loaderDeps: ({ search: { page, like__name, where__topicId } }) => {
    const dto: Record<string, unknown> = {
      page,
      take: 10,
      orderby: "createdAt",
      direction: "desc"
    }

    if (like__name !== "undefined" && like__name !== undefined) {
      dto["like__name"] = String(like__name);
    } else if (
      isNaN(Number(where__topicId))
      && String(where__topicId) !== "NaN"
      && where__topicId !== undefined
    ) {
      dto["where__topicId"] = where__topicId;
    }

    return dto;
  },
  loader: async ({ deps, context: { queryClient } }) => {
    const seriesQueryOptions = queryOptions({
      queryKey: ['series', String(deps.page)],
      queryFn: () => req<Page<ReadSeriesDto>>('series', 'get', deps),
      staleTime: 3000
    });

    return await queryClient.ensureQueryData(seriesQueryOptions);
  },
  component: () => <SeriesList />,
})
