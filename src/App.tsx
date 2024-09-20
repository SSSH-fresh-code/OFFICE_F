import { Outlet, useNavigate } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./components/ui/sheet";
import { Button } from "./components/ui/button";
import useUserStore from "./lib/store/user.store";
import { Separator } from "./components/ui/separator";
import { useState } from "react";

function App() {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { logout } = useUserStore();

  const onClickMenu = (href: string) => {
    setOpen(false);
    navigate({ to: href });
  }

  return (
    <>
      <header className="grid grid-cols-3 w-full p-3 shadow">
        <div></div>
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
              <Separator />
              <Button className="w-full" variant="link" onClick={() => logout()}>로그아웃</Button>
            </SheetContent>
          </Sheet>
        </div>
      </header >
      <div className="p-2 md:p-4">
        <Outlet />
      </div>
    </>
  );
}

export default App;
