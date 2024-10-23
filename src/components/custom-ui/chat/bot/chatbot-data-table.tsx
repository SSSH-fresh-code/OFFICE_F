import { useNavigate } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import type { Page, ReadChatBotDto } from "sssh-library";
import { MessengerType } from "sssh-library";
import { Button } from "@/components/ui/button";
import {
	SsshDataTable,
	SsshDataTableHeader,
} from "../../common/sssh-data-table";
import type { SsshDataTableOptions } from "../../common/sssh-data-table";

function ChatbotDataTable({ chatbots }: { chatbots?: Page<ReadChatBotDto> }) {
	const navigate = useNavigate();

	const columns: ColumnDef<ReadChatBotDto>[] = [
		{
			accessorKey: "name",
			header: "이름",
		},
		{
			accessorKey: "type",
			header: "타입",
			accessorFn: (v) => {
				switch (v.type) {
					case MessengerType.DISCORD:
						return "디스코드";
					case MessengerType.TELEGRAM:
						return "텔레그램";
				}
			},
		},
		{
			id: "createdAt",
			header: "생성일시",
			accessorFn: (value) => new Date(value.createdAt).toLocaleDateString(),
		},
	];

	const options: SsshDataTableOptions<ReadChatBotDto> = {
		href: "/chatbot/",
		key: "id",
		responsiveHide: ["createdAt"],
	};

	return (
		<>
			<SsshDataTableHeader info={chatbots?.info}>
				<Button
					variant="outline"
					className="font-bold"
					onClick={() => {
						navigate({ to: "/chatbot/new" });
					}}
				>
					추가
				</Button>
			</SsshDataTableHeader>
			<SsshDataTable columns={columns} data={chatbots} options={options} />
		</>
	);
}

export default ChatbotDataTable;
