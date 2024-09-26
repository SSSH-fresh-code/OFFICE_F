import PostDetailForm from '@/components/custom-ui/post/post-detail-form'
import { req } from '@/lib/api'
import { queryOptions } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { ReadPostDto, ReadSeriesDto, ReadTopicDto } from 'sssh-library'

export const Route = createFileRoute('/post/$title/')({
  loader: async ({ params, context: { queryClient } }) => {
    queryClient.invalidateQueries({ queryKey: ['optionForSelect'] });

    const postQueryOptions = queryOptions({
      queryKey: ['post', String(params.title)],
      queryFn: () => req<ReadPostDto>(`post/${params.title}`, 'get'),
    })

    const post = await queryClient.ensureQueryData(postQueryOptions);

    const topicQueryOptions = queryOptions({
      queryKey: ['topicForSelect'],
      queryFn: () =>
        req<Pick<ReadTopicDto, 'name' | 'id'>[]>(`topic/all`, 'get'),
    })

    const seriesQueryOptions = queryOptions({
      queryKey: ['optionForSelect', post.data?.topic.id],
      queryFn: () =>
        req<Pick<ReadSeriesDto, 'name' | 'id'>[]>(`series/all/${post.data?.topic.id}`, 'get'),
    })

    const series = await queryClient.ensureQueryData(seriesQueryOptions)
    const topics = await queryClient.ensureQueryData(topicQueryOptions)

    return { post, series, topics }
  },
  component: () => <PostDetailForm />,
})
