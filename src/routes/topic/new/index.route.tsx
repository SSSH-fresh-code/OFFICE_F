import TopicNewForm from '@/components/custom-ui/topic/topic-new-form';
import { PAGE_TITLE } from '@/lib/const/page-title.const';
import useSsshStore from '@/lib/store/sssh.store';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/topic/new/')({
  beforeLoad: () => {
    useSsshStore.getState().setTitle(PAGE_TITLE["/topic/new"]);
  },
  component: () => <TopicNewForm />
})

