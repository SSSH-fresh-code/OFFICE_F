import PostNewForm from '@/components/custom-ui/post/post-new-form'
import { req } from '@/lib/api'
import { queryOptions } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { ReadTopicDto } from 'sssh-library'

export const Route = createFileRoute('/post/new/')({
  loader: async ({ context: { queryClient } }) => {
    queryClient.invalidateQueries({ queryKey : ['optionForSelect']});

    const topicQueryOptions = queryOptions({
      queryKey: ['topicForSelect'],
      queryFn: () =>
        req<Pick<ReadTopicDto, 'name' | 'id'>[]>(`topic/all`, 'get'),
    })

    const topics = await queryClient.ensureQueryData(topicQueryOptions);

    return topics
  },
  component: () => <PostNewForm />,
})