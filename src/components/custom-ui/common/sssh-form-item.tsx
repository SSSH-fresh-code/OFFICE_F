import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ReactNode } from "react";

function SsshFormItem({ label, children }: {
  label: string,
  children: ReactNode
}) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        {children}
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

export default SsshFormItem;
