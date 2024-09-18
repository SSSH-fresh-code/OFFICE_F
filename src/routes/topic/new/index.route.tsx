import TopicNewForm from '@/components/custom-ui/topic/topic-new-form';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/topic/new/')({
  component: () => <TopicNewForm />
})

