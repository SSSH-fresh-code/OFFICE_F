import PostList from '@/components/custom-ui/post/post-list'
import SeriesList from '@/components/custom-ui/series/series-list'
import { req } from '@/lib/api'
import { queryOptions } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Page, ReadPostDto, ReadSeriesDto } from 'sssh-library'

export const Route = createFileRoute('/post/')({
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
      orderby: 'createdAt',
      direction: 'desc',
    }

    if (
      !isNaN(Number(where__seriesId)) &&
      String(where__seriesId) !== 'NaN' &&
      where__seriesId !== undefined
    ) {
      dto['where__seriesId'] = where__seriesId
    } else if (
      !isNaN(Number(where__topicId)) &&
      String(where__topicId) !== 'NaN' &&
      where__topicId !== undefined
    ) {
      dto['where__topicId'] = where__topicId
    }

    if (where__authorName !== 'undefined' && where__authorName !== undefined) {
      dto['where__authorName'] = String(where__authorName)
    }
    if (like__title !== 'undefined' && like__title !== undefined) {
      dto['like__title'] = String(like__title)
    }
    if (like__content !== 'undefined' && like__content !== undefined) {
      dto['like__content'] = String(like__content)
    }

    return dto
  },
  loader: async ({ deps, context: { queryClient } }) => {
    const seriesQueryOptions = queryOptions({
      queryKey: [
        'posts',
        String(deps.page),
        String(deps.like__title),
        String(deps.like__content),
        String(deps.where__authorName),
        String(deps.where__seriesId),
        String(deps.where__topicId),
      ],
      queryFn: () => req<Page<ReadPostDto>>('post', 'get', deps),
      staleTime: 3000,
    })

    return await queryClient.ensureQueryData(seriesQueryOptions)
  },
  component: () => <PostList />,
})
