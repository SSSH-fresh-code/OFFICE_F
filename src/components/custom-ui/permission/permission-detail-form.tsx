import type z from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { PermissionSchema } from "@/lib/schema/permission/permission.schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import type { ReadPermissionDto } from "sssh-library";
import { req } from "@/lib/api";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "@/routes/permission/$name/index.route";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { lazy } from "react";

const SsshFormItem = lazy(() => import("../common/sssh-form-item"));

function PermissionDetailForm() {
	const navigate = useNavigate();
	const { data } = Route.useLoaderData();
	const queryClient = useQueryClient();

	const form = useForm<z.infer<typeof PermissionSchema>>({
		resolver: zodResolver(PermissionSchema),
		defaultValues: {
			name: data?.name ?? "",
			description: data?.description ?? "",
		},
	});

	async function onSubmit(values: z.infer<typeof PermissionSchema>) {
		if (values.description === data?.description) {
			alert("수정된 내용이 존재하지 않습니다.");
			return;
		}

		if (confirm(`'권한 설명을 변경하시겠습니까?`)) {
			const PermissionResult = await req<ReadPermissionDto>(
				"permission",
				"put",
				values,
			);

			if (PermissionResult.success && PermissionResult.data) {
				queryClient.invalidateQueries({ queryKey: ["permissions"] });
				alert("권한이 정상적으로 수정되었습니다.");
			}
		}
	}

	return (
		<>
			<Card className="p-5 pt-3 bg-white bg-opacity-90">
				<div className="flex justify-end">
					<Button
						variant="link"
						onClick={() => {
							navigate({ to: "/permission" });
						}}
					>
						목록
					</Button>
				</div>
				<CardHeader className="pt-0">
					<CardTitle className="w-full text-center text-2xl">
						권한 상세정보
					</CardTitle>
				</CardHeader>
				<CardContent className="w-full flex justify-center">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-[480px] space-y-5 flex-col flex justify-center h-full"
						>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<SsshFormItem label="권한명">
										<Input {...field} value={data?.name} disabled />
									</SsshFormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<SsshFormItem label="설명(선택)">
										<Input
											placeholder="권한에 대한 설명을 입력해주세요."
											{...field}
											className="bg-white"
											id="description"
										/>
									</SsshFormItem>
								)}
							/>
							<div className="flex justify-between">
								<DropdownMenu>
									<DropdownMenuTrigger>
										<Button variant="outline">
											<Ellipsis />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="bg-white" />
								</DropdownMenu>
								<Button className="mt-1" variant="outline" type="submit">
									수정
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</>
	);
}

export default PermissionDetailForm;
