import { MessengerType, ReadChatBotDto, ReadChatDto } from "sssh-library";
import {
	queryOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import {
	readChatAllByTypeApi,
	readChatAllByTypeKey,
	sendChatApi,
} from "@/lib/api/chat-api";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SsshFormItem from "../common/sssh-form-item";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField } from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Route } from "@/routes/chat/send/index.route";
import useUserStore from "@/lib/store/user.store";
import { useForm } from "react-hook-form";
import { ChatSendSchema } from "@/lib/schema/chat/chat-send.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Textarea } from "@/components/ui/textarea";

function ChatSendForm() {
	const { user } = useUserStore();
	const { data } = Route.useLoaderData();
	if (!data) return <></>;

	const bots = data.data;
	const [botsByType, setBotsByType] = useState<ReadChatBotDto[]>(
		bots.filter((b) => b.type === MessengerType.DISCORD),
	);
	const [chats, setChats] = useState<ReadChatDto[]>();

	const form = useForm<z.infer<typeof ChatSendSchema>>({
		resolver: zodResolver(ChatSendSchema),
		values: {
			botId: "",
			chatId: "",
			userId: user?.id as string,
			message: "",
		},
	});

	const mutation = useMutation({
		mutationFn: sendChatApi,
		onSuccess: async (result) => {
			if (result.success && result.data) {
				alert("메세지를 정상적으로 보냈습니다!");
				form.resetField("message");
			}
		},
	});

	async function onSubmit({
		botId,
		chatId,
		userId,
		message,
	}: z.infer<typeof ChatSendSchema>) {
		const json: Record<string, unknown> = {
			botId: Number(botId),
			chatId: Number(chatId),
			userId: user ? String(user.id) : String(userId),
			message: String(message),
		};

		if (confirm("메세지를 전송하시겠습니까?")) {
			mutation.mutate(json);
		}
	}

	function changeType(t: MessengerType) {
		setBotsByType(bots.filter((b) => b.type === t));
	}

	function changeBot(i: string) {
		if (botsByType) {
			const id = Number(i);
			const bot = botsByType.find((b) => b.id === id);
			if (bot) {
				setChats(bot.chats);
			}
		}
	}

	return (
		<>
			<Card className="p-5 pt-3 bg-white bg-opacity-90">
				<CardHeader className="pt-0">
					<CardTitle className="w-full text-center text-2xl">
						메세지 전송
					</CardTitle>
				</CardHeader>
				<CardContent className="w-full flex justify-center">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-[480px] space-y-5 flex-col flex justify-center h-full"
						>
							<SsshFormItem label="챗봇">
								<Select
									onValueChange={(e) => {
										form.resetField("chatId");
										changeType(e as MessengerType);
									}}
									defaultValue={MessengerType.DISCORD}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="타입을 선택해주세요" />
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
							<FormField
								control={form.control}
								name="botId"
								render={({ field }) => (
									<SsshFormItem label="챗봇">
										<Select
											onValueChange={(e) => {
												form.resetField("chatId");
												field.onChange(e);
												changeBot(e);
											}}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="챗봇을 선택해주세요." />
												</SelectTrigger>
											</FormControl>
											<SelectContent className="bg-white">
												{botsByType?.map((b) => (
													<SelectItem
														value={String(b.id)}
														key={`select-bot-${b.id}`}
														className="cursor-pointer hover:bg-gray-100"
													>
														[{b.type}] {b.name}
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
									<SsshFormItem label="채팅방">
										<Select
											onValueChange={(e) => {
												field.onChange(e);
											}}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="채팅방을 선택해주세요." />
												</SelectTrigger>
											</FormControl>
											<SelectContent className="bg-white">
												{chats?.map((c) => (
													<SelectItem
														value={String(c.id)}
														key={`select-chat-${c.id}`}
														className="cursor-pointer hover:bg-gray-100"
													>
														[{c.type}] {c.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</SsshFormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="userId"
								render={({ field }) => (
									<SsshFormItem label="유저 ID">
										<Input
											{...field}
											className="bg-white"
											id="userId"
											disabled
										/>
									</SsshFormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="message"
								render={({ field }) => (
									<SsshFormItem label="메세지">
										<Textarea
											{...field}
											placeholder="내용을 입력해주세요"
											className="bg-white"
											id="chatMessage"
										/>
									</SsshFormItem>
								)}
							/>
							<Button className="mt-1" variant="outline" type="submit">
								전송
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</>
	);
}

export default ChatSendForm;
