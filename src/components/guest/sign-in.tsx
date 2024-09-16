import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { req } from "@/lib/api";
import { ReadUserDto } from "sssh-library";

interface LoginProps {
  login: (user: ReadUserDto) => void;
  changeMode: (mode: 'in' | 'up') => void;
}

function SignIn({ login, changeMode }: LoginProps) {
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4)
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const loginResult = await req<ReadUserDto>('auth/login', 'post', values);

    if (loginResult.success && loginResult.data) {
      login(loginResult.data);
    }
  }

  async function onClick(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    changeMode('up');
  }

  return (
    <Card className="aspect-square p-5 w-[350px] bg-white bg-opacity-90">
      <CardHeader>
        <CardTitle className="w-full text-center text-2xl">로그인</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 flex-col flex justify-center h-full">
            <FormField
              control={form.control}
              name="email"
              render={
                ({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@limc.dev" {...field} className="bg-white" id="sssh-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }
            />
            <FormField
              control={form.control}
              name="password"
              render={
                ({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="********" {...field} className="bg-white" type="password" id="sssh-pw" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }
            />
            <Button className="mt-5 bg-white" type="submit">로그인</Button>
            <Button className="mt-1 bg-gray-300" variant="secondary" onClick={onClick}>회원가입</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SignIn;
