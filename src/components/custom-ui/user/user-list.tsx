import { useEffect, useState } from "react";
import { Page, ReadUserDto } from "sssh-library";
import { Route } from "@/routes/user/index.route";
import UserDataTable from "./user-data-table";

function UserList() {
  const { success, data } = Route.useLoaderData();
  const { where__email, like__name } = Route.useLoaderDeps();

  const isFilltering = !!where__email || !!like__name;

  const [users, setUsers] = useState<Page<ReadUserDto>>();

  useEffect(() => {
    if (success && data) {
      setUsers(data);
    }
  }, [success, data])


  return (
    <UserDataTable users={users} isFiltering={isFilltering} />
  );
}

export default UserList;
