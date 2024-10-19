import type z from "zod";
import { useForm } from "react-hook-form";
import { MessengerType } from "sssh-library";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Route } from "@/routes/chat/$id/index.route";
import { ChatSchema } from "@/lib/schema/chat/chat.schema";
import SsshFormItem from "../common/sssh-form-item";
import { deleteChatApi } from "@/lib/api/chat-api";

function ChatDetailForm() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { data } = Route.useLoaderData();
	if (!data) return <></>;

	const form = useForm<z.infer<typeof ChatSchema>>({
		resolver: zodResolver(ChatSchema),
		defaultValues: {
			id: data.id,
			chatId: data.chatId,
			name: data.name,
			type: data.type,
		},
	});

	const mutation = useMutation({
		mutationFn: deleteChatApi,
		onSuccess: (result) => {
			queryClient.removeQueries({
				queryKey: ["chat"],
				type: "inactive",
			});

			queryClient.removeQueries({
				queryKey: ["chatbot"],
				type: "inactive",
			});

			if (result.success) {
				alert("채팅방이 정상적으로 삭제되었습니다.");
			}
		},
	});

	async function onSubmit(values: z.infer<typeof ChatSchema>) {
		const confirmMessage = `[${values.type}] ${values.name} 채팅방을 삭제하시겠습니까?`;

		if (confirm(confirmMessage)) {
			if (values.id) {
				mutation.mutate(values.id);
				navigate({
					to: "/chat",
					search: { where__type: values.type, page: 1 },
				});
			} else {
				alert("아이디가 올바르지 않습니다!");
			}
		}
	}

	return (
		<>
			<Card className="p-5 pt-3 bg-white bg-opacity-90">
				<div className="flex justify-end">
					<Button
						variant="link"
						onClick={() =>
							navigate({ to: "..", search: { where__type: data.type } })
						}
					>
						목록으로
					</Button>
				</div>
				<CardHeader className="pt-0">
					<CardTitle className="w-full text-center text-2xl">
						채팅방 상세
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
									<SsshFormItem label="챗봇 이름">
										<Input
											placeholder="챗봇의 이름을 입력해주세요."
											{...field}
											className="bg-white"
											id="chatbotName"
											disabled
										/>
									</SsshFormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="type"
								render={({ field }) => (
									<SsshFormItem label="타입">
										<Select {...field} disabled>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="타입을 선택해주세요." />
												</SelectTrigger>
											</FormControl>
											<SelectContent className="bg-white">
												{Object.keys(MessengerType).map((d) => (
													<SelectItem
														value={String(d)}
														key={`select-type-${d}`}
														className="cursor-pointer hover:bg-gray-100"
													>
														{d}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</SsshFormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="chatId"
								render={({ field }) => (
									<SsshFormItem label="채팅방 외부 ID">
										<Input
											placeholder="채팅방의 외부 ID를 입력해주세요."
											{...field}
											className="bg-white"
											id="chatId"
											disabled
										/>
									</SsshFormItem>
								)}
							/>
							<Button
								className="mt-1 bg-red-500 text-white hover:bg-red-300 hover:text-white"
								variant="outline"
								type="submit"
							>
								삭제
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</>
	);
}

export default ChatDetailForm;
