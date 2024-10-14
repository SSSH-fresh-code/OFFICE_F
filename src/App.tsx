import { Outlet, useNavigate } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./components/ui/sheet";
import { Button } from "./components/ui/button";
import useUserStore from "./lib/store/user.store";
import { Separator } from "./components/ui/separator";
import { useState } from "react";
import useSsshStore from "./lib/store/sssh.store";

function App() {
	const [open, setOpen] = useState<boolean>(false);
	const navigate = useNavigate();
	const { logout } = useUserStore();
	const { title } = useSsshStore();

	const onClickMenu = (href: string) => {
		setOpen(false);
		navigate({ to: href });
	};

	return (
		<>
			<header className="grid grid-cols-3 w-full p-3 shadow">
				<div />
				<div
					className="flex justify-center items-center cursor-pointer font-bold text-2xl space-x-3"
					onClick={() => navigate({ to: "/" })}
				>
					<span>{"{"}</span>
					<span>{"}"}</span>
				</div>
				<div className="flex justify-end items-center pr-3">
					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger asChild>
							<Menu className="cursor-pointer" onClick={() => setOpen(true)} />
						</SheetTrigger>
						<SheetContent className="bg-white pt-10">
							<SheetHeader>
								<SheetTitle />
							</SheetHeader>
							<Separator className="my-1 bg-gray-200" />
							<p className="font-bold text-center mt-3 mb-2">챗봇 관리</p>
							<Button
								className="w-full"
								variant="link"
								onClick={() => onClickMenu("/chatbot")}
							>
								챗봇 관리
							</Button>
							<Button
								className="w-full"
								variant="link"
								onClick={() => onClickMenu("/chat")}
							>
								채팅방 관리
							</Button>
							<Separator className="my-1 bg-gray-200" />
							<p className="font-bold text-center mt-3 mb-2">회원/권한 관리</p>
							<Button
								className="w-full"
								variant="link"
								onClick={() => onClickMenu("/user")}
							>
								회원 관리
							</Button>
							<Button
								className="w-full"
								variant="link"
								onClick={() => onClickMenu("/permission")}
							>
								권한 관리
							</Button>
							<Separator className="my-1 bg-gray-200" />
							<p className="font-bold text-center mt-3 mb-2">블로그 관리</p>
							<Button
								className="w-full"
								variant="link"
								onClick={() => onClickMenu("/topic")}
							>
								주제
							</Button>
							<Button
								className="w-full"
								variant="link"
								onClick={() => onClickMenu("/series")}
							>
								시리즈
							</Button>
							<Button
								className="w-full"
								variant="link"
								onClick={() => onClickMenu("/post")}
							>
								게시글
							</Button>
							<Separator className="my-1 bg-gray-200" />
							<Button
								className="w-full"
								variant="link"
								onClick={() => logout()}
							>
								로그아웃
							</Button>
						</SheetContent>
					</Sheet>
				</div>
			</header>
			<div className="p-2 md:p-4">
				{title && <p className="text-3xl py-2 font-extrabold">{title}</p>}
				<Outlet />
			</div>
		</>
	);
}

export default App;
