import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useNavigate } from "@tanstack/react-router";
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Page, PageInfo } from "sssh-library";

export interface SsshDataTableOptions<TData> {
	href: string;
	key?: keyof TData;
	responsiveHide?: string[];
}

interface SsshDataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data?: Page<TData>;
	options: SsshDataTableOptions<TData>;
}

export function SsshDataTable<TData, TValue>({
	columns,
	data: { data, info } = {
		data: [],
		info: { current: 1, last: 1, total: 0, take: 10 },
	},
	options,
}: SsshDataTableProps<TData, TValue>) {
	const navigate = useNavigate();

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header, idx) => {
									return (
										<TableHead
											key={header.id + "-" + idx}
											className={
												"text-[15px] text-center font-bold " +
												(options.responsiveHide?.includes(header.id)
													? "hidden md:table-cell"
													: "")
											}
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row, idx) => (
								<TableRow
									key={row.id + "-" + idx}
									data-state={row.getIsSelected() && "selected"}
									className="cursor-pointer hover:bg-gray-100"
									onClick={
										options && options.key
											? (a) => {
													console.log(a);
													navigate({
														to: options.href + row.original[options.key!],
													});
												}
											: () => {}
									}
								>
									{row.getVisibleCells().map((cell, idx) => (
										<TableCell
											key={cell.id + "-" + idx}
											className={
												"text-[13px] text-center py-3 " +
												(options.responsiveHide?.includes(cell.column.id)
													? "hidden md:table-cell"
													: "")
											}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									데이터가 존재하지 않습니다.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<SsshDataTablePagination info={info} href={options.href} />
		</>
	);
}

export function SsshDataTableHeader({
	info,
	children,
}: {
	info?: PageInfo;
	children?: JSX.Element;
}) {
	if (!info) return <></>;

	const { last, current, take } = info;
	return (
		<div className="flex justify-between items-end mb-3">
			<span className="text-[10px] text-gray-300">
				총 {last} 페이지 중 {current}, {take}개씩 조회
			</span>
			<div>{children}</div>
		</div>
	);
}

export function SsshDataTablePagination({
	info,
	href,
}: { info: PageInfo; href: string }) {
	const { current, last, total } = info;

	if (total < 1 || current === 0) return <></>;

	const isLast = current === last;
	const hasNext = current < last;
	const isFirst = isLast && current === 1;

	return (
		<div className="mt-3">
			<Pagination>
				<PaginationContent>
					{!isFirst && (
						<PaginationItem className="rounded-md hover:bg-gray-200">
							<PaginationPrevious href={`${href}?page=${current - 1}`} />
						</PaginationItem>
					)}
					{[current - 1, current, current + 1]
						.filter((i) => i > 0 && i <= last)
						.map((i) => (
							<PaginationItem
								key={`page-${i}`}
								className={
									(i === current ? "bg-gray-200 font-bold" : "") +
									" rounded-md hover:bg-gray-200 p-0.5"
								}
							>
								<PaginationLink href={`${href}?page=${i}`}>{i}</PaginationLink>
							</PaginationItem>
						))}
					{hasNext && (
						<PaginationItem className="rounded-md hover:bg-gray-200">
							<PaginationNext href={`${href}?page=${current + 1}`} />
						</PaginationItem>
					)}
				</PaginationContent>
			</Pagination>
		</div>
	);
}
