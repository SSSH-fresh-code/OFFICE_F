import z from "zod";
import { req } from '@/lib/api';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from "@tanstack/react-router";
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ReadPostDto, ReadSeriesDto } from "sssh-library";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PostSchema } from "@/lib/schema/post/post.schema";
import { Textarea } from "@/components/ui/textarea";
import { Route } from "@/routes/post/new/index.route";
import { ReactNode, useEffect, useState } from "react";
import { queryOptions, useQueryClient } from "@tanstack/react-query";
import useUserStore from "@/lib/store/user.store";
import SsshFormItem from "../common/sssh-form-item";

function PostNewForm() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { data } = Route.useLoaderData();

  const queryClient = useQueryClient();

  const [topicId, setTopicId] = useState<string>("");
  const [series, setSeries] = useState<Pick<ReadSeriesDto, 'name' | 'id'>[]>([]);

  useEffect(() => {
    if (topicId) {
      const seriesQueryOptions = queryOptions({
        queryKey: ['optionForSelect', topicId],
        queryFn: () =>
          req<Pick<ReadSeriesDto, 'name' | 'id'>[]>(`series/all/${topicId}`, 'get'),
        staleTime: Infinity
      })

      queryClient.ensureQueryData(seriesQueryOptions)
        .then(({ data }) => {
          setSeries(data ? data : []);
        })
        .catch(() => {
          setSeries([]);
        });
    }
  }, [topicId])


  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: "",
      content: "",
      thumbnail: "",
      authorName: user!.name,
      topicId: "",
      seriesId: ""
    }
  });

  async function onSubmit({
    title,
    content,
    thumbnail,
    authorName,
    topicId,
    seriesId
  }: z.infer<typeof PostSchema>) {
    const json: Record<string, unknown> = {
      title,
      content,
      authorName,
      thumbnail: thumbnail ? thumbnail : "",
      topicId: Number(topicId),
    }

    if (seriesId) {
      json.seriesId = Number(seriesId);
    }

    if (confirm(`게시글을 생성하시겠습니까?`)) {
      const postResult = await req<ReadPostDto>('post', 'post', json);

      if (postResult.success && postResult.data) {
        if (confirm("게시글이 정상적으로 생성되었습니다.\n해당 게시글로 이동하시겠습니까?")) {
          navigate({ to: `/post/${postResult.data.title}` });
        } else {
          navigate({ to: "/post" });
        }
      }
    }
  }

  return (
    <>
      <Card className="p-5 pt-3 bg-white bg-opacity-90">
        <div className="flex justify-end">
          <Button variant="link" onClick={() => { navigate({ to: "/post" }) }}>뒤로가기</Button>
        </div>
        <CardHeader className="pt-0">
          <CardTitle className="w-full text-center text-2xl">게시글 생성</CardTitle>
        </CardHeader>
        <CardContent className="w-full flex justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-[480px] space-y-5 flex-col flex justify-center h-full"
            >
              <FormField
                control={form.control}
                name="topicId"
                render={({ field }) => (
                  <SsshFormItem label="주제">
                    <Select
                      onValueChange={(e) => {
                        form.resetField("seriesId");
                        field.onChange(e);
                        setTopicId(e)
                      }}
                      defaultValue={field.value}
                    >
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
                  </SsshFormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seriesId"
                render={({ field }) => (
                  <SsshFormItem label="시리즈">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={series.length < 1}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="시리즈를 선택해주세요." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        {
                          series && series.map(d => (
                            <SelectItem
                              value={String(d.id)}
                              key={`select-series-${d.id}`}
                              className="cursor-pointer hover:bg-gray-100"
                            >
                              {d.name}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </SsshFormItem>
                )}
              />
              <FormField
                control={form.control}
                name="authorName"
                render={
                  ({ field }) => (
                    <SsshFormItem label="작성자">
                      <Input
                        {...field}
                        className="bg-white"
                        id="postAuthorName"
                        disabled
                      />
                    </SsshFormItem>
                  )
                }
              />
              <FormField
                control={form.control}
                name="title"
                render={
                  ({ field }) => (
                    <SsshFormItem label="제목">
                      <Input
                        {...field}
                        placeholder="제목을 입력해주세요"
                        className="bg-white"
                        id="postTitle"
                      />
                    </SsshFormItem>
                  )
                }
              />
              <FormField
                control={form.control}
                name="thumbnail"
                render={
                  ({ field }) => (
                    <SsshFormItem label="썸네일(선택)">
                      <Input
                        {...field}
                        placeholder="썸네일을 입력해주세요"
                        className="bg-white"
                        id="postThumbnail"
                      />
                    </SsshFormItem>
                  )
                }
              />
              <FormField
                control={form.control}
                name="content"
                render={
                  ({ field }) => (
                    <SsshFormItem label="내용">
                      <Textarea
                        {...field}
                        placeholder="내용을 입력해주세요"
                        className="bg-white"
                        id="postContent"
                      />
                    </SsshFormItem>
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

export default PostNewForm;

