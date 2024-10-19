import { useNavigate } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import type { Page, ReadChatDto } from "sssh-library";
import { MessengerType } from "sssh-library";
import { Button } from "@/components/ui/button";
import { SsshDataTable, SsshDataTableHeader } from "../common/sssh-data-table";
import type { SsshDataTableOptions } from "../common/sssh-data-table";

function ChatDataTable({ chats }: { chats?: Page<ReadChatDto> }) {
	const navigate = useNavigate();

	const columns: ColumnDef<ReadChatDto>[] = [
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

	const options: SsshDataTableOptions<ReadChatDto> = {
		href: "/chat/",
		key: "id",
		responsiveHide: ["createdAt"],
	};

	return (
		<>
			<SsshDataTableHeader info={chats?.info}>
				<Button
					variant="outline"
					className="font-bold"
					onClick={() => {
						navigate({ to: "/chat/new" });
					}}
				>
					추가
				</Button>
			</SsshDataTableHeader>
			<SsshDataTable columns={columns} data={chats} options={options} />
		</>
	);
}

export default ChatDataTable;
