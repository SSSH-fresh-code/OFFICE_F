import { Button } from "@/components/ui/button";
import DiscordIcon from "../../../assets/discord.svg";
import TelegramIcon from "../../../assets/telegram.svg";
import SlackIcon from "../../../assets/slack.svg";
import { useNavigate } from "@tanstack/react-router";
import { MessengerType } from "sssh-library";

function ChatSelect() {
	const navigate = useNavigate();

	const navigateChat = (type: MessengerType) => {
		navigate({
			to: "/chat",
			search: { where__type: type },
		});
	};

	return (
		<div className="w-full text-center">
			<h1 className="text-5xl font-extrabold">타입 선택</h1>

			<p className="font-extralight text-md text-gray-400 mt-5">
				불러올 채팅방의 타입을 선택해주세요.
			</p>
			<div className="w-full flex space-x-10 justify-center items-center py-10">
				<Button
					variant="outline"
					className="w-48 h-72 space-y-5 flex flex-col justify-center items-center"
					onClick={() => navigateChat(MessengerType.DISCORD)}
				>
					<img src={DiscordIcon} alt="Discord Icon" />
					<h2 className="text-2xl font-extrabold">디스코드</h2>
					<p className="font-extralight text-xs text-gray-400">
						<span>디스코드로 생성된</span>
						<br />
						<span>채팅방들의 목록을 가져옵니다</span>
					</p>
				</Button>
				<Button
					variant="outline"
					className="w-48 h-72 space-y-5 flex flex-col justify-center items-center"
					onClick={() => navigateChat(MessengerType.TELEGRAM)}
				>
					<img src={TelegramIcon} alt="Telegram Icon" />
					<h2 className="text-2xl font-extrabold">텔레그램</h2>
					<p className="font-extralight text-xs text-gray-400">
						<span>텔레그램으로 생성된</span>
						<br />
						<span>채팅방들의 목록을 가져옵니다</span>
					</p>
				</Button>
				<Button
					variant="outline"
					className="w-48 h-72 space-y-5 flex flex-col justify-center items-center"
					onClick={() => navigateChat(MessengerType.SLACK)}
				>
					<img src={SlackIcon} alt="Slack Icon" />
					<h2 className="text-2xl font-extrabold">슬랙</h2>
					<p className="font-extralight text-xs text-gray-400">
						<span>슬랙으로 생성된</span>
						<br />
						<span>채팅방들의 목록을 가져옵니다</span>
					</p>
				</Button>
			</div>
		</div>
	);
}

export default ChatSelect;
