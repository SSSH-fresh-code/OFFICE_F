import PermissionNewForm from '@/components/custom-ui/permission/permission-new-form'
import useSsshStore from '@/lib/store/sssh.store';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/permission/new/')({
  beforeLoad: () => {
    useSsshStore.getState().setTitle("");
  },
  component: () => <PermissionNewForm />,
})
