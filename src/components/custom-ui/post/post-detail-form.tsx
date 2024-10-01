import z from 'zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField } from '@/components/ui/form';
import { ReadPostDto, ReadSeriesDto } from 'sssh-library';
import { req } from '@/lib/api';
import { useNavigate } from '@tanstack/react-router';
import { hasDiff } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Route } from '@/routes/post/$title/index.route';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from 'lucide-react';
import { PostSchema } from '@/lib/schema/post/post.schema';
import { useEffect, useState } from 'react';
import SsshFormItem from '../common/sssh-form-item';
import { queryOptions, useQueryClient } from '@tanstack/react-query';
import { Textarea } from '@/components/ui/textarea';
import SsshDropdownMenuItem from '../common/sssh-dropdown-menu-item';

function PostDetailForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { post: { data }, series, topics } = Route.useLoaderData();

  const [topicId, setTopicId] = useState<string>(String(data?.topic.id));
  const [seriesList, setSeriesList] = useState<Pick<ReadSeriesDto, 'name' | 'id'>[]>(series?.data ? series.data : []);

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
          setSeriesList(data ? data : []);
        })
        .catch(() => {
          setSeriesList([]);
        });
    }
  }, [topicId])

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      id: String(data?.id),
      title: String(data?.title),
      content: String(data?.content),
      thumbnail: String(data?.thumbnail),
      authorName: String(data?.author.name),
      topicId: String(data?.topic.id),
      seriesId: data?.series ? String(data.series.id) : undefined
    }
  });

  if (!data) {
    alert("게시글이 존재하지 않습니다!");
    navigate({ to: "/post" })
    return;
  }

  async function onSubmit({
    id,
    title,
    content,
    thumbnail,
    authorName,
    topicId,
    seriesId
  }: z.infer<typeof PostSchema>) {
    if (!hasDiff(data, { id, title, content, thumbnail, authorName, topicId, seriesId })) {
      alert("수정된 내용이 존재하지 않습니다.");
      return;
    }

    const json: Record<string, unknown> = {
      id: Number(id),
      title,
      content,
      authorName,
      thumbnail: thumbnail ? thumbnail : "",
      topicId: Number(topicId),
    }

    if (seriesId) {
      json.seriesId = Number(seriesId);
    }

    if (confirm(`게시글을 변경하시겠습니까?`)) {
      const postResult = await req<ReadPostDto>('post', 'put', json);

      if (postResult.success && postResult.data) {
        alert("게시글이 정상적으로 수정되었습니다.");
      }
    }
  }

  const functions = {
    moveToParentTopic: () => {
      navigate({ to: "/topic/" + data.topic.name })
    },
    moveToParentSeries: () => {
      if (data.series) {
        navigate({ to: "/series/" + data.series.name })
      }
    },
    moveToAnotherPostCurrentAutor: () => {
      if (data.series) {
        navigate({ to: "/post?where__authorName=" + data.author.name })
      }
    },
    remove: () => {
      if (confirm("해당 게시글을 삭제하시겠습니까?")) {
        req<void>(`post/${data.id}`, 'delete')
          .then((result) => {
            if (result.success) {
              alert("정상적으로 삭제되었습니다!");
              navigate({ to: "/post" });
            }
          })
      }
    }
  }

  return (
    <>
      <Card className="p-5 pt-3 bg-white bg-opacity-90">
        <div className="flex justify-end">
          <Button variant="link" onClick={() => { navigate({ to: "/post" }) }}>목록</Button>
        </div>
        <CardHeader className="pt-0">
          <CardTitle className="w-full text-center text-2xl">시리즈 상세정보</CardTitle>
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
                          topics.data && topics.data.map(d => (
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
                          seriesList && seriesList.map(d => (
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
              <div className="flex justify-between">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="outline">
                      <Ellipsis />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white">
                    <SsshDropdownMenuItem
                      onClick={functions.moveToParentTopic}
                    >
                      상위 주제로 이동
                    </SsshDropdownMenuItem>
                    <SsshDropdownMenuItem
                      onClick={functions.moveToParentSeries}
                    >
                      상위 시리즈로 이동
                    </SsshDropdownMenuItem>
                    <SsshDropdownMenuItem
                      onClick={functions.moveToAnotherPostCurrentAutor}
                    >
                      해당 저자의 다른 게시글 보기
                    </SsshDropdownMenuItem>
                    <SsshDropdownMenuItem
                      onClick={functions.remove}
                    >
                      게시글 삭제
                    </SsshDropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button className="mt-1" variant="outline" type="submit">수정</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}

export default PostDetailForm;
