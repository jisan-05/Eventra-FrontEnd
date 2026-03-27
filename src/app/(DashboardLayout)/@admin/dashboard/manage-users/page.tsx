import UserTable from "@/components/user-table";
import { userService } from "@/services/user.services";

export default async function ManageUsersPage() {
  const users = await userService.getAllUser();
  console.log(users);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      <UserTable users={users?.data || []} />
    </div>
  );
}