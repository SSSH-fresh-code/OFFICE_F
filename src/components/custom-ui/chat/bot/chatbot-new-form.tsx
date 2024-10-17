import type z from "zod";
import { useForm } from "react-hook-form";
import { MessengerType } from "sssh-library";
import type { ReadChatDto } from "sssh-library";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { ChatbotSchema } from "@/lib/schema/chat/chatbot.schema";
import SsshFormItem from "../../common/sssh-form-item";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Ellipsis } from "lucide-react";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { onAddChat } from "@/lib/util/chatbot/chatbot.util";
import { readChatAllByTypeApi, readChatAllByTypeKey } from "@/lib/api/chat-api";
import { createChatbotApi } from "@/lib/api/chatbot-api";

function ChatbotNewForm() {
	const navigate = useNavigate();
	const [type, setType] = useState<MessengerType>(MessengerType.DISCORD);
	const [chats, setChats] = useState<ReadChatDto[]>();
	const [selectChat, setSelectChat] = useState<ReadChatDto>();
	const [selectChats, setSelectChats] = useState<ReadChatDto[]>([]);

	useEffect(() => {
		if (type) {
			init();
			const query = useQuery({
				queryKey: readChatAllByTypeKey(type),
				queryFn: async () => await readChatAllByTypeApi(type),
			});

			if (query.isSuccess) {
				const chats = query.data?.data?.data;
				setChats(chats ?? []);
			}
		}
	}, [type]);

	const form = useForm<z.infer<typeof ChatbotSchema>>({
		resolver: zodResolver(ChatbotSchema),
		defaultValues: {
			botId: "",
			token: "",
			name: "",
			description: "",
			type: undefined,
			chatIds: [],
		},
	});

	const { removeQueries } = useQueryClient();
	const mutation = useMutation({
		mutationFn: createChatbotApi,
		onSuccess: async (result) => {
			removeQueries({
				queryKey: ["chatbot"],
				type: "inactive",
			});

			if (result.success && result.data) {
				if (
					confirm(
						"챗봇이 정상적으로 생성되었습니다.\n해당 주제로 이동하시겠습니까?",
					)
				) {
					navigate({ to: `/chatbot/${result.data.id}` });
				} else {
					navigate({ to: "/chatbot" });
				}
			}
		},
	});

	async function onSubmit(values: z.infer<typeof ChatbotSchema>) {
		const confirmMessage = `[${values.type}] ${values.name} 챗봇을 생성하시겠습니까?`;

		if (confirm(confirmMessage)) {
			values.chatIds = selectChats.map((c) => String(c.id));
			mutation.mutate(values);
		}
	}

	const onAddChatClick = () => {
		const chats = onAddChat(selectChat, selectChats);
		if (chats) setSelectChats(chats);
	};

	const init = () => {
		setChats([]);
		setSelectChat(undefined);
		setSelectChats([]);
	};

	return (
		<>
			<Card className="p-5 pt-3 bg-white bg-opacity-90">
				<div className="flex justify-end">
					<Button
						variant="link"
						onClick={() => {
							navigate({ to: "/chatbot" });
						}}
					>
						뒤로가기
					</Button>
				</div>
				<CardHeader className="pt-0">
					<CardTitle className="w-full text-center text-2xl">
						챗봇 생성
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
											onValueChange={(e) => {
												if (
													selectChats.length > 0 &&
													!confirm(
														"추가한 채팅방 목록이 모두 지워집니다.\n타입을 변경하시겠습니까?",
													)
												) {
													return false;
												}

												setType(e as MessengerType);
												form.resetField("chatIds");
												field.onChange(e);
											}}
											value={type}
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
							<div className="grid w-full grid-cols-12">
								<FormItem className="col-span-10">
									<FormLabel>소속 채팅방</FormLabel>
									<FormControl>
										<Select
											disabled={!chats || (chats && chats.length < 1)}
											onValueChange={(id) => {
												const idNumber = Number(id);
												const chat = chats?.find((c) => c.id === idNumber);
												setSelectChat(chat);
											}}
										>
											<FormControl>
												<SelectTrigger className="rounded-e-none">
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
														{c.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
								</FormItem>
								<div className="col-span-2 flex items-end">
									<Button
										className="w-full rounded-s-none bg-gray-800"
										disabled={!selectChat}
										onClick={onAddChatClick}
									>
										추가
									</Button>
								</div>
							</div>

							<ScrollArea className="w-full h-48 border border-gray-300 rounded-xl px-1 py-3">
								{selectChats.length < 1 ? (
									<div className="w-full h-full flex flex-col justify-center items-center text-sm text-gray-400 font-light">
										<Ellipsis className="h-12" />
										<span>추가한 채팅방이 없습니다.</span>
									</div>
								) : (
									selectChats.map(({ id, name }) => (
										<Alert key={`alert-chat-${id}`} className="my-1">
											<ChatBubbleIcon className="h-4 w-4" />
											<AlertTitle>{name}</AlertTitle>
										</Alert>
									))
								)}
							</ScrollArea>
							<FormField
								control={form.control}
								name="botId"
								render={({ field }) => (
									<SsshFormItem label="챗봇 외부 ID">
										<Input
											placeholder="챗봇의 외부 ID를 입력해주세요."
											{...field}
											className="bg-white"
											id="chatbotChatId"
										/>
									</SsshFormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="token"
								render={({ field }) => (
									<SsshFormItem label="챗봇 토큰">
										<Input
											placeholder="챗봇의 토큰을 입력해주세요."
											{...field}
											className="bg-white"
											id="chatbotToken"
										/>
									</SsshFormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<SsshFormItem label="챗봇 설명">
										<Textarea
											{...field}
											placeholder="챗봇의 설명을 작성해주세요."
											className="bg-white"
											id="chatbotDescription"
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

export default ChatbotNewForm;
