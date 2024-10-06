import z from "zod";
import { req } from "@/lib/api";
import { useForm } from "react-hook-form";
import { ReadTopicDto } from "sssh-library";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
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

function TopicNewForm() {
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof TopicSchema>>({
		resolver: zodResolver(TopicSchema),
		defaultValues: {
			name: "",
		},
	});

	async function onSubmit(values: z.infer<typeof TopicSchema>) {
		if (confirm(`'${values.name}' 주제를 생성하시겠습니까?`)) {
			const topicResult = await req<ReadTopicDto>("topic", "post", {
				name: values.name,
			});

			if (topicResult.success && topicResult.data) {
				if (
					confirm(
						"주제가 정상적으로 생성되었습니다.\n해당 주제로 이동하시겠습니까?",
					)
				) {
					navigate({ to: `/topic/${topicResult.data.name}` });
				} else {
					navigate({ to: `/topic` });
				}
			}
		}
	}

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
						뒤로가기
					</Button>
				</div>
				<CardHeader className="pt-0">
					<CardTitle className="w-full text-center text-2xl">
						주제 생성
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
							<Button className="mt-1" variant="outline" type="submit">
								추가
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</>
	);
}

export default TopicNewForm;
