import { useNavigate } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import type { Page, ReadUserDto } from "sssh-library";
import { SsshDataTable, SsshDataTableHeader } from "../common/sssh-data-table";
import type { SsshDataTableOptions } from "../common/sssh-data-table";
import { Button } from "@/components/ui/button";

function UserDataTable({
	users,
	isFiltering,
}: { users?: Page<ReadUserDto>; isFiltering?: boolean }) {
	const navigate = useNavigate();

	const columns: ColumnDef<ReadUserDto>[] = [
		{
			id: "email",
			header: "이메일",
			accessorKey: "email",
		},
		{
			id: "name",
			header: "이름",
			accessorKey: "name",
		},
		{
			id: "createdAt",
			header: "가입일시",
			accessorFn: (value) => new Date(value.createdAt).toLocaleDateString(),
		},
	];

	const options: SsshDataTableOptions<ReadUserDto> = {
		href: "/user/",
		key: "id",
		responsiveHide: ["email", "createdAt"],
	};

	return (
		<>
			<SsshDataTableHeader info={users?.info}>
				<div className="flex gap-2 justify-end items-end">
					{isFiltering && (
						<Button
							variant="link"
							className="font-light text-[11px] flex items-end justify-end"
							onClick={() => {
								navigate({ to: "/user" });
							}}
						>
							검색필터 초기화
						</Button>
					)}
				</div>
			</SsshDataTableHeader>
			<SsshDataTable columns={columns} data={users} options={options} />
		</>
	);
}

export default UserDataTable;
