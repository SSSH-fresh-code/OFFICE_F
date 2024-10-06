import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Route } from "@/routes/permission/index.route";
import { useNavigate } from "@tanstack/react-router";

function PermissionList() {
  const { data } = Route.useLoaderData();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex justify-end">
          <Button
            variant="outline"
            className="font-bold"
            onClick={() => { navigate({ to: "/permission/new" }) }}
          >
            추가
          </Button>
        </div>
        <ScrollArea className="w-full h-48 md:h-96">
          <div className="h-full w-full flex flex-col justify-center items-center gap-3">
            {
              data &&
              data.map((p, idx) => {
                const { name, description } = p;
                return (
                  <Button
                    id={`toggle-${idx}`}
                    aria-label="Toggle bold"
                    className="w-full md:w-[480px]"
                    variant="outline"
                    onClick={() => navigate({ to: `/permission/${p.name}` })}
                  >
                    {`${name} : ${description}`}
                  </Button>
                )
              })
            }
            {
              !data && (
                <div className="py-20 text-center font-extralight">
                  데이터가 존재하지 않습니다.
                </div>
              )
            }
          </div>
        </ScrollArea >
      </div>
    </>
  );
}

export default PermissionList;
