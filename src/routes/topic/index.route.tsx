import { req } from '@/lib/api'
import { queryOptions } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react';
import { convertUnderbar, Page, PageInfo, ReadTopicDto } from 'sssh-library';
import { useReactTable, ColumnDef, getCoreRowModel, flexRender } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

export const Route = createFileRoute('/topic/')({
  validateSearch: (search: Record<string, unknown>) =>
    ({ page: Number(search.page ?? 1), like__name: search.like__name }),
  loaderDeps: ({ search: { page, like__name } }) => {
    const dto: Record<string, unknown> = {
      page,
      take: 10,
      orderby: "createdAt",
      direction: "desc"
    }

    if (like__name !== "undefined") {
      dto["like__name"] = String(like__name);
    }

    return dto;
  },
  loader: async ({ deps, context: { queryClient } }) => {
    const postsQueryOptions = queryOptions({
      queryKey: ['topics', String(deps.page)],
      queryFn: () => req<Page<ReadTopicDto>>('topic', 'get', deps)
    });

    return await queryClient.ensureQueryData(postsQueryOptions);
  },
  component: () => <TopicList />,
})

function TopicList() {
  const { success, data } = Route.useLoaderData();

  const [topics, setTopics] = useState<Page<ReadTopicDto>>();

  useEffect(() => {
    if (success && data) {
      setTopics(data);
    }
  }, [success, data])


  return <TopicDataTable topics={topics} />;
}


function TopicDataTable({ topics }: { topics?: Page<ReadTopicDto> }) {
  const columns: ColumnDef<ReadTopicDto>[] = [
    {
      accessorKey: "name",
      header: "이름",
      accessorFn: (value) => convertUnderbar(value.name, true)
    },
    {
      accessorKey: "createdAt",
      header: "생성일시"
    }
  ];

  const options: DataTableOptions<ReadTopicDto> = {
    href: "/topic/",
    key: "name"
  }


  return <DataTable columns={columns} data={topics} options={options} />
}

interface DataTableOptions<TData> {
  href: string
  key?: keyof TData
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data?: Page<TData>
  options: DataTableOptions<TData>
}

function DataTable<TData, TValue>({
  columns, data: { data, info } = { data: [], info: { current: 1, last: 1, total: 0, take: 10 } }, options
}: DataTableProps<TData, TValue>) {
  const navigate = useNavigate();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-[15px] text-center font-bold">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="cursor-pointer"
                  onClick={
                    (options && options.key)
                      ? () => { navigate({ to: options.href + row.original[options.key!] }) }
                      : () => { }
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-[13px] text-center">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  데이터가 존재하지 않습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination info={info} href={options.href} />
    </>
  );
}

function DataTablePagination({ info, href }: { info: PageInfo, href: string }) {
  const { current, last, total } = info;

  if (total < 1 || current === 0) return <></>;

  const isLast = current === last;
  const hasNext = current < last;
  const isFirst = !isLast && current === 1;

  return (
    <div className="mt-3">
      <Pagination>
        <PaginationContent>
          {!isFirst && (
            <PaginationItem className="rounded-md hover:bg-gray-200">
              <PaginationPrevious href={`${href}?page=${current - 1}`} />
            </PaginationItem>
          )}
          {
            [current - 1, current, current + 1]
              .filter(i => i > 0 && i <= last)
              .map(i => (
                <PaginationItem className={(i === current ? "bg-gray-200 font-bold" : "") + " rounded-md hover:bg-gray-200 p-0.5"}>
                  <PaginationLink href={`${href}?page=${i}`}>{i}</PaginationLink>
                </PaginationItem>
              ))
          }
          {hasNext && (
            <PaginationItem className="rounded-md hover:bg-gray-200">
              <PaginationNext href={`${href}?page=${current + 1}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  )

}
