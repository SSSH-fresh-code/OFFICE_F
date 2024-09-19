import { useNavigate } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { convertUnderbar, Page, ReadSeriesDto } from "sssh-library";
import { SsshDataTable, SsshDataTableHeader, SsshDataTableOptions } from "../common/sssh-data-table";
import { Button } from "@/components/ui/button";

function SeriesDataTable({ series }: { series?: Page<ReadSeriesDto> }) {
  const navigate = useNavigate();

  const columns: ColumnDef<ReadSeriesDto>[] = [
    {
      header: "시리즈명",
      accessorFn: (value) => convertUnderbar(value.name, true)
    },
    {
      header: "상위 주제명",
      accessorFn: (value) => convertUnderbar(value.topic.name, true)
    },
    {
      accessorKey: "createdAt",
      header: "생성일시",
      accessorFn: (value) => new Date(value.createdAt).toLocaleString()
    }
  ];

  const options: SsshDataTableOptions<ReadSeriesDto> = {
    href: "/series/",
    key: "name"
  }

  return (
    <>
      <SsshDataTableHeader info={series?.info}>
        <Button
          variant="outline"
          className="font-bold"
          onClick={() => { navigate({ to: "/series/new" }) }}
        >
          추가
        </Button>
      </SsshDataTableHeader >
      <SsshDataTable columns={columns} data={series} options={options} />
    </>
  )
}

export default SeriesDataTable;
