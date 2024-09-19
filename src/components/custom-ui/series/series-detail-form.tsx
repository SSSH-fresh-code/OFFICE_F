import z from 'zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ReadSeriesDto, ReadTopicDto } from 'sssh-library';
import { req } from '@/lib/api';
import { useNavigate } from '@tanstack/react-router';
import { Route } from '@/routes/topic/$name/index.route';
import { SeriesSchema } from '@/lib/schema/series/series.schema';
import { hasDiff } from '@/lib/utils';

function SeriesDetailForm() {
  const navigate = useNavigate();
  const { data } = Route.useLoaderData();

  const form = useForm<z.infer<typeof SeriesSchema>>({
    resolver: zodResolver(SeriesSchema),
    defaultValues: {
      id: String(data?.id),
      name: String(data?.name),
      topicId: String(data?.topicId)
    }
  });

  async function onSubmit(values: z.infer<typeof SeriesSchema>) {
    if (!hasDiff(data, values)) {
      alert("수정된 내용이 존재하지 않습니다.");
      return;
    }

    if (confirm(`시리즈를 변경하시겠습니까?`)) {
      const seriesResult = await req<ReadSeriesDto>('series', 'put', {
        id: Number(values.id),
        name: values.name,
        topicId: Number(values.topicId)
      });

      if (seriesResult.success && seriesResult.data) {
        alert("시리즈가 정상적으로 수정되었습니다.");
      }
    }
  }

  return (
    <>
      <Card className="p-5 pt-3 bg-white bg-opacity-90">
        <div className="flex justify-end">
          <Button variant="link" onClick={() => { navigate({ to: "/series" }) }}>목록</Button>
        </div>
        <CardHeader className="pt-0">
          <CardTitle className="w-full text-center text-2xl">시리즈 상세정보</CardTitle>
        </CardHeader>
        <CardContent className="w-full flex justify-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-[480px] space-y-5 flex-col flex justify-center h-full">
              <FormField
                control={form.control}
                name="id"
                render={
                  ({ field }) => (
                    <FormItem>
                      <FormLabel>ID</FormLabel>
                      <FormControl>
                        <Input readOnly disabled {...field} className="bg-white" id="seriesId" />
                      </FormControl>
                    </FormItem>
                  )
                }
              />
              <FormField
                control={form.control}
                name="topicId"
                render={
                  ({ field }) => (
                    <FormItem>
                      <FormLabel>주제</FormLabel>
                      <FormControl>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }
              />
              <FormField
                control={form.control}
                name="name"
                render={
                  ({ field }) => (
                    <FormItem>
                      <FormLabel>시리즈 이름</FormLabel>
                      <FormControl>
                        <Input placeholder="시리즈 이름을 입력해주세요." {...field} className="bg-white" id="seriesName" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }
              />
              <Button className="mt-1" variant="outline" type="submit">수정</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}

export default SeriesDetailForm;
