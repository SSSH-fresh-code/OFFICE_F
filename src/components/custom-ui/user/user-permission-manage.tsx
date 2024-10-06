import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toggle } from "@/components/ui/toggle";
import { req } from "@/lib/api";
import { PAGE_TITLE } from "@/lib/const/page-title.const";
import { Route } from "@/routes/user/$id/permission/index.route";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ReadUserDto } from "sssh-library";

function UserPermissionManage() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { user, permission } = Route.useLoaderData();

	const oriPerm = user.permissions;

	const [perm, setPerm] = useState<string[]>([...oriPerm]);

	const onPressedChange = (pressed: boolean, elem: string) => {
		if (pressed) {
			setPerm([...perm, elem]);
		} else {
			setPerm(perm.filter((s) => s !== elem));
		}
	};

	const functions = {
		save: async () => {
			if (oriPerm.sort().toString() === perm.sort().toString()) {
				alert("변경사항이 없습니다!");
				return;
			}

			if (confirm(`권한을 수정하시겠습니까?`)) {
				const userPermissionResult = await req<ReadUserDto>(
					"user/permission",
					"put",
					{
						id: user.id,
						permissions: perm,
					},
				);

				if (userPermissionResult.success && userPermissionResult.data) {
					alert("권한이 수정되었습니다!");
					location.reload();
				}
			}
		},
		reset: () => {
			location.reload();
		},
	};

	return (
		<div className="flex flex-col gap-2">
			<h1 className="text-center text-3xl font-bold">
				{PAGE_TITLE["/user/$id/permission"]}
			</h1>
			<ScrollArea className="w-full h-48 md:h-96">
				<div className="h-full w-full flex flex-col justify-center items-center gap-3">
					{permission.map((p, idx) => {
						const { name, description } = p;
						return (
							<Toggle
								id={`toggle-${idx}`}
								aria-label="Toggle bold"
								className="w-full md:w-[480px]"
								variant="outline"
								onPressedChange={(b) => onPressedChange(b, name)}
								defaultPressed={oriPerm.includes(name)}
							>
								{`${name} : ${description}`}
							</Toggle>
						);
					})}
				</div>
			</ScrollArea>
			<div className="w-full flex justify-center">
				<div className="flex justify-between w-[480px]">
					<Button variant="secondary" onClick={functions.reset}>
						초기화
					</Button>
					<Button variant="outline" onClick={functions.save}>
						수정
					</Button>
				</div>
			</div>
		</div>
	);
}

export default UserPermissionManage;
