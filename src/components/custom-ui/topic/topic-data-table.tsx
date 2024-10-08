import { useNavigate } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import type { Page, ReadTopicDto } from "sssh-library";
import { convertUnderbar } from "sssh-library";
import { SsshDataTable, SsshDataTableHeader } from "../common/sssh-data-table";
import type { SsshDataTableOptions } from "../common/sssh-data-table";
import { Button } from "@/components/ui/button";

function TopicDataTable({ topics }: { topics?: Page<ReadTopicDto> }) {
	const navigate = useNavigate();

	const columns: ColumnDef<ReadTopicDto>[] = [
		{
			accessorKey: "name",
			header: "이름",
			accessorFn: (value) => convertUnderbar(value.name, true),
		},
		{
			accessorKey: "createdAt",
			header: "생성일시",
			accessorFn: (value) => new Date(value.createdAt).toLocaleDateString(),
		},
	];

	const options: SsshDataTableOptions<ReadTopicDto> = {
		href: "/topic/",
		key: "name",
	};

	return (
		<>
			<SsshDataTableHeader info={topics?.info}>
				<Button
					variant="outline"
					className="font-bold"
					onClick={() => {
						navigate({ to: "/topic/new" });
					}}
				>
					추가
				</Button>
			</SsshDataTableHeader>
			<SsshDataTable columns={columns} data={topics} options={options} />
		</>
	);
}

export default TopicDataTable;
