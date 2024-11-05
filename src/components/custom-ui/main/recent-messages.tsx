import { Card, CardContent } from "@/components/ui/card";
import MainBox from "./main-box";
import DiscordIcon from "../../../assets/discord.svg";
import SlackIcon from "../../../assets/slack.svg";
import TelegramIcon from "../../../assets/telegram.svg";
import type { LogDto, Page } from "sssh-library";
import { MessengerType } from "sssh-library";
import type { ChatLog } from "../chat/chat-log-detail-form";

function RecentMessages({
	recentMessages,
}: {
	recentMessages: Page<LogDto>;
}) {
	const messages = recentMessages.data;

	return (
		<MainBox
			title="최근 전송된 메세지들"
			description="가장 최근에 전송된 메세지 5개입니다."
		>
			{messages?.map((m) => {
				const d = JSON.parse(m.data) as ChatLog;
				const type = d.bot.type;
				return (
					<Card className="px-1 py-3" key={`recent-post-${m.id}`}>
						<CardContent className="px-3 py-0">
							<h1 className="flex items-center">
								{type === MessengerType.DISCORD && (
									<img
										src={DiscordIcon}
										alt="Discord Icon"
										className="w-[15px] mr-1"
									/>
								)}
								{type === MessengerType.SLACK && (
									<img
										src={SlackIcon}
										alt="Slack Icon"
										className="w-[15px] mr-1"
									/>
								)}
								{type === MessengerType.TELEGRAM && (
									<img
										src={TelegramIcon}
										alt="Telegram Icon"
										className="w-[15px] mr-1"
									/>
								)}
								<span className="text-lg font-bold">
									{`${d.bot.name}-${d.chat.name}`}
								</span>
							</h1>
							<p className="text-sm text-gray-500">
								{d.message.substring(0, 130) +
									(d.message.length > 130 ? "..." : "")}
							</p>
							<p className="mt-3 text-xs text-gray-400 bottom-0">
								{new Date(m.logDate).toLocaleDateString()}
							</p>
						</CardContent>
					</Card>
				);
			})}
		</MainBox>
	);
}

export default RecentMessages;
