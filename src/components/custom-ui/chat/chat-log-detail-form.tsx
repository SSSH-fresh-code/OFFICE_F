import type { ReadChatBotDto, ReadChatDto, ReadUserDto } from "sssh-library";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Route } from "@/routes/chat/log/$id/index.route";
import { FormItem, FormLabel } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { error } from "console";
import { Textarea } from "@/components/ui/textarea";

type ChatLog = {
	bot: ReadChatBotDto;
	chat: ReadChatDto;
	user: ReadUserDto;
	message: string;
};

function ChatLogDetailForm() {
	const navigate = useNavigate();

	const loaderData = Route.useLoaderData();
	if (!loaderData.data) return <></>;

	const data = JSON.parse(loaderData.data.data) as ChatLog;

	return (
		<>
			<Card className="p-5 pt-3 bg-white bg-opacity-90">
				<div className="flex justify-end">
					<Button variant="link" onClick={() => navigate({ to: ".." })}>
						목록으로
					</Button>
				</div>
				<CardHeader className="pt-0">
					<CardTitle className="w-full text-center text-2xl">
						로그 상세
					</CardTitle>
				</CardHeader>
				<CardContent className="w-full flex justify-center">
					<div className="w-[480px] space-y-5 flex-col flex justify-center h-full">
						<Label className="text-destructive text-black">전송 유저 id</Label>
						<Input value={data.user.id} readOnly />
						<Label className="text-destructive text-black">챗봇명</Label>
						<Input value={data.bot.name} readOnly />
						<Label className="text-destructive text-black">채팅방명</Label>
						<Input value={data.chat.name} readOnly />
						<Label className="text-destructive text-black">채팅방명</Label>
						<Textarea value={data.message} readOnly />
						<Label className="text-destructive text-black">전체 내용</Label>
						<Textarea
							rows={30}
							value={JSON.stringify(data, null, 2)}
							readOnly
						/>
					</div>
				</CardContent>
			</Card>
		</>
	);
}

export default ChatLogDetailForm;
