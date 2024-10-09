import type z from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { TopicSchema } from "@/lib/schema/topic/topic.schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import type { ReadTopicDto } from "sssh-library";
import { req } from "@/lib/api";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "@/routes/topic/$name/index.route";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { lazy } from "react";
const SsshDropdownMenuItem = lazy(
	() => import("../common/sssh-dropdown-menu-item"),
);

function TopicDetailForm() {
	const navigate = useNavigate();
	const { data } = Route.useLoaderData();

	const form = useForm<z.infer<typeof TopicSchema>>({
		resolver: zodResolver(TopicSchema),
		defaultValues: {
			id: String(data?.id),
			name: String(data?.name),
		},
	});

	async function onSubmit(values: z.infer<typeof TopicSchema>) {
		if (data?.name === values.name) {
			alert("수정된 내용이 존재하지 않습니다.");
			return;
		}

		if (
			confirm(`'${data?.name}' -> '${values.name}' 주제명을 변경하시겠습니까?`)
		) {
			const topicResult = await req<ReadTopicDto>("topic", "put", {
				id: Number(values.id),
				name: values.name,
			});

			if (topicResult.success && topicResult.data) {
				alert("주제가 정상적으로 수정되었습니다.");
			}
		}
	}

	const functions = {
		moveChildSeries: () => {
			navigate({
				to: "/series",
				search: {
					page: 1,
					like__name: undefined,
					where__topicId: data?.id,
				},
			});
		},
		moveChildPosts: () => {
			navigate({
				to: `/post?where__topicId=${data?.id}`,
			});
		},
	};

	return (
		<>
			<Card className="p-5 pt-3 bg-white bg-opacity-90">
				<div className="flex justify-end">
					<Button
						variant="link"
						onClick={() => {
							navigate({ to: "/topic" });
						}}
					>
						목록
					</Button>
				</div>
				<CardHeader className="pt-0">
					<CardTitle className="w-full text-center text-2xl">
						주제 상세정보
					</CardTitle>
				</CardHeader>
				<CardContent className="w-full flex justify-center">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-[480px] space-y-5 flex-col flex justify-center h-full"
						>
							<FormField
								control={form.control}
								name="id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>ID</FormLabel>
										<FormControl>
											<Input
												readOnly
												disabled
												{...field}
												className="bg-white"
												id="topicId"
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>주제명</FormLabel>
										<FormControl>
											<Input
												placeholder="주제명을 입력해주세요."
												{...field}
												className="bg-white"
												id="topicName"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex justify-between">
								<DropdownMenu>
									<DropdownMenuTrigger>
										<Button variant="outline">
											<Ellipsis />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="bg-white">
										<SsshDropdownMenuItem onClick={functions.moveChildSeries}>
											하위 시리즈 목록으로 이동
										</SsshDropdownMenuItem>
										<SsshDropdownMenuItem onClick={functions.moveChildPosts}>
											하위 게시글 목록으로 이동
										</SsshDropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
								<Button className="mt-1" variant="outline" type="submit">
									수정
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</>
	);
}

export default TopicDetailForm;
