import { lazy, useState } from "react";
import type { ReadUserDto } from "sssh-library";

const SignIn = lazy(() => import("./sign-in"));
const SignUp = lazy(() => import("./sign-up"));

interface GuestAppProps {
	login: (user: ReadUserDto) => void;
}

function GuestApp({ login }: GuestAppProps) {
	const [mode, setMode] = useState<"in" | "up">("in");

	const changeMode = (mode: "in" | "up" = "in") => {
		setMode(mode);
	};

	return (
		<div className="flex justify-center items-center h-[100vh] bg-[url('/login.webp')] bg-center">
			{mode === "in" ? (
				<SignIn login={login} changeMode={changeMode} />
			) : (
				<SignUp changeMode={changeMode} />
			)}
		</div>
	);
}

export default GuestApp;
