import type z from "zod";
import { useForm } from "react-hook-form";
import { MessengerType } from "sssh-library";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { ChatSchema } from "@/lib/schema/chat/chat.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChatbotApi } from "@/lib/api/chatbot-api";
import SsshFormItem from "../common/sssh-form-item";
import { createChatApi } from "@/lib/api/chat-api";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

function ChatNewForm() {
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof ChatSchema>>({
		resolver: zodResolver(ChatSchema),
		defaultValues: {
			chatId: "",
			name: "",
			type: MessengerType.DISCORD,
		},
	});

	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: createChatApi,
		onSuccess: async (result) => {
			queryClient.removeQueries({
				queryKey: ["chat"],
				type: "inactive",
			});

			if (result.success && result.data) {
				if (
					confirm(
						"채팅방이 정상적으로 생성되었습니다.\n해당 채팅방으로 이동하시겠습니까?",
					)
				) {
					navigate({ to: `/chat/${result.data.id}` });
				} else {
					navigate({ to: "/chat" });
				}
			}
		},
	});

	async function onSubmit(values: z.infer<typeof ChatSchema>) {
		const confirmMessage = `[${values.type}] ${values.name} 채팅방을 생성하시겠습니까?`;

		if (confirm(confirmMessage)) {
			mutation.mutate(values);
		}
	}

	return (
		<>
			<Card className="p-5 pt-3 bg-white bg-opacity-90">
				<div className="flex justify-end">
					<Button
						variant="link"
						onClick={() => {
							navigate({ to: ".." });
						}}
					>
						뒤로가기
					</Button>
				</div>
				<CardHeader className="pt-0">
					<CardTitle className="w-full text-center text-2xl">
						채팅방 생성
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
									<SsshFormItem label="채팅방 이름">
										<Input
											placeholder="채팅방 이름을 입력해주세요."
											{...field}
											className="bg-white"
											id="chatName"
										/>
									</SsshFormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="type"
								render={({ field }) => (
									<SsshFormItem label="타입">
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
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
											placeholder="채팅방 외부 ID를 입력해주세요."
											{...field}
											className="bg-white"
											id="chatChatId"
										/>
									</SsshFormItem>
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

export default ChatNewForm;
