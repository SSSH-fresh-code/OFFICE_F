import { useNavigate } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import {
	convertUnderbar,
	Page,
	ReadPostDto,
	ReadSeriesDto,
	ReadTopicDto,
} from "sssh-library";
import {
	SsshDataTable,
	SsshDataTableHeader,
	SsshDataTableOptions,
} from "../common/sssh-data-table";
import { Button } from "@/components/ui/button";
import { Image, ImageOff, X } from "lucide-react";

function PostDataTable({
	posts,
	isFiltering,
}: { posts?: Page<ReadPostDto>; isFiltering?: boolean }) {
	const navigate = useNavigate();

	const columns: ColumnDef<ReadPostDto>[] = [
		{
			header: "썸네일",
			cell: (cell) => {
				return cell.getValue() ? (
					<Button variant="link">
						<Image />
					</Button>
				) : (
					<Button variant="link">
						<ImageOff />
					</Button>
				);
			},
		},
		{
			header: "제목",
			accessorFn: (value) => convertUnderbar(value.title, true),
		},
		{
			id: "topicName",
			header: "상위 주제명",
			accessorFn: (value) => convertUnderbar(value.topic.name, true),
		},
		{
			id: "seriesName",
			header: "시리즈명",
			accessorFn: (value) =>
				value.series ? convertUnderbar(value.series.name, true) : "-",
		},
		{
			id: "authorName",
			header: "글쓴이",
			accessorFn: (value) => value.author.name,
		},
		{
			id: "createdAt",
			header: "생성일시",
			accessorFn: (value) => new Date(value.createdAt).toLocaleDateString(),
		},
	];

	const options: SsshDataTableOptions<ReadPostDto> = {
		href: "/post/",
		key: "title",
		responsiveHide: ["topicName", "seriesName", "createdAt"],
	};

	return (
		<>
			<SsshDataTableHeader info={posts?.info}>
				<div className="flex gap-2 justify-end items-end">
					{isFiltering && (
						<Button
							variant="link"
							className="font-light text-[11px] flex items-end justify-end"
							onClick={() => {
								navigate({ to: "/post" });
							}}
						>
							검색필터 초기화
						</Button>
					)}
					<Button
						variant="outline"
						className="font-bold"
						onClick={() => {
							navigate({ to: "/post/new" });
						}}
					>
						추가
					</Button>
				</div>
			</SsshDataTableHeader>
			<SsshDataTable columns={columns} data={posts} options={options} />
		</>
	);
}

export default PostDataTable;
