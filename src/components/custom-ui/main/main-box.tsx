import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";

function MainBox({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: JSX.Element | JSX.Element[];
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        {description && (
          <CardDescription className="text-gray-400">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-3">
        <ScrollArea className="overflow-auto h-64 grid gap-3 scrollbar-hide md:h-auto md:aspect-square">
          {children}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default MainBox;
