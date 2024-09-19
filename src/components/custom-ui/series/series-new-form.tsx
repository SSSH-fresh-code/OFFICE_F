import z from "zod";
import { req } from '@/lib/api';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from "@tanstack/react-router";
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { SeriesSchema } from "@/lib/schema/series/series.schema";
import { ReadSeriesDto } from "sssh-library";
import { Route } from "@/routes/series/new/index.route";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function SeriesNewForm() {
  const navigate = useNavigate();
  const { data } = Route.useLoaderData();

  const form = useForm<z.infer<typeof SeriesSchema>>({
    resolver: zodResolver(SeriesSchema),
    defaultValues: {
      name: "",
      topicId: ""
    }
  });

  async function onSubmit(values: z.infer<typeof SeriesSchema>) {
    if (confirm(`'${values.name}' 시리즈를 생성하시겠습니까?`)) {
      const seriesResult = await req<ReadSeriesDto>('series', 'post', {
        name: values.name,
        topicId: Number(values.topicId)
      });

      if (seriesResult.success && seriesResult.data) {
        if (confirm("시리즈가 정상적으로 생성되었습니다.\n해당 시리즈로 이동하시겠습니까?")) {
          navigate({ to: `/series/${seriesResult.data.name}` });
        } else {
          navigate({ to: `/series` });
        }
      }
    }
  }

  return (
    <>
      <Card className="p-5 pt-3 bg-white bg-opacity-90">
        <div className="flex justify-end">
          <Button variant="link" onClick={() => { navigate({ to: "/series" }) }}>뒤로가기</Button>
        </div>
        <CardHeader className="pt-0">
          <CardTitle className="w-full text-center text-2xl">시리즈 생성</CardTitle>
        </CardHeader>
        <CardContent className="w-full flex justify-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-[480px] space-y-5 flex-col flex justify-center h-full">
              <FormField
                control={form.control}
                name="topicId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>상위 토픽</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="주제를 선택해주세요." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        {
                          data && data.map(d => (
                            <SelectItem
                              value={String(d.id)}
                              key={`select-${d.id}`}
                              className="cursor-pointer hover:bg-gray-100"
                            >
                              {d.name}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />              <FormField
                control={form.control}
                name="name"
                render={
                  ({ field }) => (
                    <FormItem>
                      <FormLabel>시리즈명</FormLabel>
                      <FormControl>
                        <Input placeholder="시리즈명을 입력해주세요." {...field} className="bg-white" id="seriesName" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }
              />
              <Button className="mt-1" variant="outline" type="submit">추가</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}

export default SeriesNewForm;
