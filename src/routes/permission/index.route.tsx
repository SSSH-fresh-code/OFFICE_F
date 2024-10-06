import PermissionList from '@/components/custom-ui/permission/permission-list';
import { req } from '@/lib/api';
import { PAGE_TITLE } from '@/lib/const/page-title.const';
import useSsshStore from '@/lib/store/sssh.store';
import { queryOptions } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { ReadPermissionDto } from 'sssh-library';

export const Route = createFileRoute('/permission/')({
  beforeLoad: () => {
    useSsshStore.getState().setTitle(PAGE_TITLE["/permission"]);
  },
  loader: async ({ context: { queryClient } }) => {
    const permissionsQueryOptions = queryOptions({
      queryKey: ['permissions'],
      queryFn: () => req<ReadPermissionDto[]>(`permission`, 'get'),
      staleTime: Infinity
    })

    return await queryClient.ensureQueryData(permissionsQueryOptions);
  },
  component: () => <PermissionList />,
})
