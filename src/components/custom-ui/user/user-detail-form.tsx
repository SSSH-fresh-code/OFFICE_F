import z from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { ReadUserDto } from "sssh-library";
import { req } from "@/lib/api";
import { useNavigate } from "@tanstack/react-router";
import { hasDiff } from "@/lib/utils";
import { Route } from "@/routes/user/$id/index.route";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import SsshFormItem from "../common/sssh-form-item";
import SsshDropdownMenuItem from "../common/sssh-dropdown-menu-item";
import { UserSchema } from "@/lib/schema/user.schema";

function UserDetailForm() {
	const navigate = useNavigate();
	const data = Route.useLoaderData();

	const form = useForm<z.infer<typeof UserSchema>>({
		resolver: zodResolver(UserSchema),
		defaultValues: {
			id: String(data.id),
			name: String(data.name),
		},
	});

	async function onSubmit({ id, name }: z.infer<typeof UserSchema>) {
		if (!hasDiff({ id: data.id, name: data.name }, { id, name })) {
			alert("수정된 내용이 존재하지 않습니다.");
			return;
		}

		if (confirm(`회원 정보를 수정하시겠습니까?`)) {
			const userResult = await req<ReadUserDto>("user", "put", { id, name });

			if (userResult.success && userResult.data) {
				alert("회원정보를 정상적으로 수정되었습니다.");
			}
		}
	}

	const functions = {
		moveToPostMade: () => {
			navigate({ to: "/post?where__authorName=" + data.name });
		},
		managePermission: () => {
			navigate({ to: `/user/${data.id}/permission` });
		},
	};

	return (
		<>
			<Card className="p-5 pt-3 bg-white bg-opacity-90">
				<div className="flex justify-end">
					<Button
						variant="link"
						onClick={() => {
							navigate({ to: "/user/" });
						}}
					>
						목록
					</Button>
				</div>
				<CardHeader className="pt-0">
					<CardTitle className="w-full text-center text-2xl">
						회원 상세정보
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
								name="id"
								render={({ field }) => (
									<SsshFormItem label="ID">
										<Input
											{...field}
											className="bg-white"
											id="userId"
											disabled
										/>
									</SsshFormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<SsshFormItem label="이메일">
										<Input
											{...field}
											className="bg-white"
											id="userEmail"
											value={data.email}
											disabled
										/>
									</SsshFormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<SsshFormItem label="제목">
										<Input
											{...field}
											placeholder="이름을 입력해주세요."
											className="bg-white"
											id="userName"
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
									<DropdownMenuContent className="bg-white">
										<SsshDropdownMenuItem onClick={functions.moveToPostMade}>
											작성한 게시글보기
										</SsshDropdownMenuItem>
										<SsshDropdownMenuItem onClick={functions.managePermission}>
											권한 수정하기
										</SsshDropdownMenuItem>
									</DropdownMenuContent>
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

export default UserDetailForm;
