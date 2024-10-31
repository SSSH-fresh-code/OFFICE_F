import type { ColumnDef } from "@tanstack/react-table";
import type { LogDto, Page } from "sssh-library";
import { SsshDataTable } from "../common/sssh-data-table";
import type { SsshDataTableOptions } from "../common/sssh-data-table";

function ChatLogDataTable({ logs }: { logs?: Page<LogDto> }) {
	const columns: ColumnDef<LogDto>[] = [
		{
			id: "createdAt",
			header: "전송일시",
			accessorFn: (v) => new Date(v.logDate).toLocaleString(),
		},
		{
			id: "data",
			header: "내용",
			accessorFn: (v) =>
				v.data.substring(v.data.length - 51, v.data.length - 1).concat("..."),
		},
	];

	const options: SsshDataTableOptions<LogDto> = {
		href: "/chat/log/",
		key: "id",
	};

	return <SsshDataTable columns={columns} data={logs} options={options} />;
}

export default ChatLogDataTable;
