import { useNavigate } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { convertUnderbar } from "sssh-library";
import type { Page, ReadSeriesDto } from "sssh-library";
import type { SsshDataTableOptions } from "../common/sssh-data-table";
import { SsshDataTable, SsshDataTableHeader } from "../common/sssh-data-table";
import { Button } from "@/components/ui/button";

function SeriesDataTable({ series }: { series?: Page<ReadSeriesDto> }) {
	const navigate = useNavigate();

	const columns: ColumnDef<ReadSeriesDto>[] = [
		{
			header: "시리즈명",
			accessorFn: (value) => convertUnderbar(value.name, true),
		},
		{
			id: "topicName",
			header: "상위 주제명",
			accessorFn: (value) => convertUnderbar(value.topic.name, true),
		},
		{
			id: "createdAt",
			header: "생성일시",
			accessorFn: (value) => new Date(value.createdAt).toLocaleDateString(),
		},
	];

	const options: SsshDataTableOptions<ReadSeriesDto> = {
		href: "/series/",
		key: "name",
		responsiveHide: ["topicName"],
	};

	return (
		<>
			<SsshDataTableHeader info={series?.info}>
				<Button
					variant="outline"
					className="font-bold"
					onClick={() => {
						navigate({ to: "/series/new" });
					}}
				>
					추가
				</Button>
			</SsshDataTableHeader>
			<SsshDataTable columns={columns} data={series} options={options} />
		</>
	);
}

export default SeriesDataTable;
