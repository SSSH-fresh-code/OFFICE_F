import SeriesNewForm from '@/components/custom-ui/series/series-new-form';
import { req } from '@/lib/api';
import { queryOptions } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { ReadSeriesDto } from 'sssh-library';

export const Route = createFileRoute('/series/new/')({
  loader: async ({ context: { queryClient } }) => {
    const topicQueryOptions = queryOptions({
      queryKey: ['topicForSelect'],
      queryFn: () => req<Pick<ReadSeriesDto, "name" | "id">[]>(`topic/all`, 'get'),
    });

    return await queryClient.ensureQueryData(topicQueryOptions);
  },
  component: () => <SeriesNewForm />,
})
