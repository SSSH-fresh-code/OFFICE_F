import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { req } from "@/lib/api";
import { ReadUserDto } from "sssh-library";

interface SignUpProps {
  changeMode: (mode: 'in' | 'up') => void;
}

function SignUp({ changeMode }: SignUpProps) {
  const signUpSchema = z.object({
    email: z.string().email("올바른 이메일 형식을 입력해주세요."),
    password: z.string().min(4, "비밀번호는 4자 이상이어야 합니다."),
    passwordRe: z.string().min(4, "비밀번호는 4자 이상이어야 합니다."),
    name: z.string().min(2, "이름은 2자 이상이어야 합니다.")
  }).superRefine(({ passwordRe, password }, ctx) => {
    if (passwordRe !== password) {
      ctx.addIssue({
        code: "custom",
        message: "비밀번호가 일치하지 않습니다.",
        path: ['passwordRe']
      });
    }
  });

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordRe: "",
      name: "",
    }
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    const signUpResult = await req<ReadUserDto>('user', 'post', values);

    if (signUpResult.success && signUpResult.data) {
      alert("회원가입이 완료되었습니다!");
      changeMode('in');
    }
  }

  async function onClick(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    changeMode('in');
  }

  return (
    <Card className="aspect-square p-5 w-[350px] bg-white bg-opacity-90">
      <CardHeader>
        <CardTitle className="w-full text-center text-2xl">회원가입</CardTitle>
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
                      <Input placeholder="이메일을 입력해주세요." {...field} className="bg-white" id="sssh-up-email" />
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
                      <Input placeholder="비밀번호를 입력해주세요." {...field} className="bg-white" type="password" id="sssh-up-pw" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }
            />
            <FormField
              control={form.control}
              name="passwordRe"
              render={
                ({ field }) => (
                  <FormItem>
                    <FormLabel>Password 확인</FormLabel>
                    <FormControl>
                      <Input placeholder="비밀번호를 다시 입력해주세요." {...field} className="bg-white" type="password" id="sssh-up-pw-re" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }
            />

            <FormField
              control={form.control}
              name="name"
              render={
                ({ field }) => (
                  <FormItem>
                    <FormLabel>이름</FormLabel>
                    <FormControl>
                      <Input placeholder="이름을 입력해주세요." {...field} className="bg-white" id="sssh-up-nm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }
            />
            <Button className="mt-5 bg-white" type="submit">가입</Button>
            <Button className="mt-1 text-white bg-black" onClick={onClick}>뒤로가기</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default SignUp;
