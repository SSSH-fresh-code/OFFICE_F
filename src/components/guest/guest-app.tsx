import { useState } from "react";
import { ReadUserDto } from "sssh-library";
import SignIn from "./sign-in";
import SignUp from "./sign-up";

interface GuestAppProps {
  login: (user: ReadUserDto) => void
}

function GuestApp({ login }: GuestAppProps) {
  const [mode, setMode] = useState<'in' | 'up'>('in');

  const changeMode = (mode: 'in' | 'up' = 'in') => {
    setMode(mode);
  }

  return (
    <div className="flex justify-center items-center h-[100vh] bg-[url('/login.webp')] bg-center">
      {mode === 'in' ? <SignIn login={login} changeMode={changeMode} /> : <SignUp changeMode={changeMode} />}
    </div>
  )
}

export default GuestApp;
