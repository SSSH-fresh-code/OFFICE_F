import z from "zod";
import { req } from '@/lib/api';
import { useForm } from 'react-hook-form';
import { ReadPermissionDto } from 'sssh-library';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from "@tanstack/react-router";
import { zodResolver } from '@hookform/resolvers/zod';
import { PermissionSchema } from '@/lib/schema/permission/permission.schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField } from '@/components/ui/form';
import SsshFormItem from "../common/sssh-form-item";
import { useQueryClient } from "@tanstack/react-query";

function PermissionNewForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof PermissionSchema>>({
    resolver: zodResolver(PermissionSchema),
    defaultValues: {
      name: ""
    }
  });

  async function onSubmit(values: z.infer<typeof PermissionSchema>) {
    if (confirm(`'${values.name}' 권한을 생성하시겠습니까?`)) {
      const permissionResult = await req<ReadPermissionDto>('permission', 'post', {
        name: values.name,
        description: values.description
      });

      if (permissionResult.success && permissionResult.data) {
        queryClient.invalidateQueries({ queryKey: ['permissions'] });
        if (confirm("권한을 정상적으로 생성되었습니다.\n해당 권한으로 이동하시겠습니까?")) {
          navigate({ to: `/permission/${permissionResult.data.name}` });
        } else {
          navigate({ to: `/permission` });
        }
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
              navigate({ to: "/permission" })
            }}>
            뒤로가기
          </Button>
        </div>
        <CardHeader className="pt-0">
          <CardTitle className="w-full text-center text-2xl">권한 생성</CardTitle>
        </CardHeader>
        <CardContent className="w-full flex justify-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-[480px] space-y-5 flex-col flex justify-center h-full">
              <FormField
                control={form.control}
                name="name"
                render={
                  ({ field }) => (
                    <SsshFormItem label="권한명">
                      <Input
                        placeholder="권한명을 입력해주세요"
                        {...field}
                        className="bg-white"
                        id="name"
                      />
                    </SsshFormItem>
                  )
                }
              />
              <FormField
                control={form.control}
                name="description"
                render={
                  ({ field }) => (
                    <SsshFormItem label="설명(선택)">
                      <Input
                        placeholder="권한에 대한 설명을 입력해주세요."
                        {...field}
                        className="bg-white"
                        id="description"
                      />
                    </SsshFormItem>
                  )
                }
              />
              <Button className="mt-1" variant="outline" type="submit">추가</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}

export default PermissionNewForm;
