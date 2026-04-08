/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  users: any[];
}

export default function UserTable({ users }: Props) {
  const [userList, setUserList] = useState(users);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // 🗑️ Delete user (soft delete)
  const handleDelete = async (id: string) => {
    try {
      setLoadingId(id);

      const res = await fetch(`/api/v1/users/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setUserList((prev) => prev.filter((u) => u.id !== id));
        toast.success("User deleted successfully");
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      toast.error("Error deleting user");
      console.error(error);
    } finally {
      setLoadingId(null);
    }
  };

  const handleRoleChange = async (id: string, role: "ADMIN" | "USER" | "MANAGER") => {
    try {
      const res = await fetch(`/api/v1/users/${id}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ role }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data?.message || "Failed to update role");
      }
      setUserList((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
      toast.success("User role updated");
    } catch (error: any) {
      toast.error(error?.message || "Failed to update role");
    }
  };

  const filteredUsers = useMemo(() => {
    return userList.filter((user) => {
      const matchQuery =
        user.name?.toLowerCase().includes(query.toLowerCase()) ||
        user.email?.toLowerCase().includes(query.toLowerCase());
      const matchRole = roleFilter === "ALL" ? true : user.role === roleFilter;
      return matchQuery && matchRole;
    });
  }, [userList, query, roleFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginatedUsers = filteredUsers.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <div className="bg-card rounded-2xl shadow-md border border-border">
      <div className="flex flex-col gap-3 border-b border-border p-4 md:flex-row md:items-center md:justify-between">
        <Input
          placeholder="Filter by name or email..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          className="md:max-w-sm"
        />
        <Select
          value={roleFilter}
          onValueChange={(value) => {
            setRoleFilter(value);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-full md:w-44">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All roles</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="USER">User</SelectItem>
            <SelectItem value="MANAGER">Manager</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedUsers.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                No users found
              </TableCell>
            </TableRow>
          )}

          {paginatedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Select
                  value={user.role}
                  onValueChange={(value) => handleRoleChange(user.id, value as "ADMIN" | "USER" | "MANAGER")}
                >
                  <SelectTrigger className="h-8 w-[130px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">ADMIN</SelectItem>
                    <SelectItem value="MANAGER">MANAGER</SelectItem>
                    <SelectItem value="USER">USER</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell className="text-right">
                {/* 🗑️ Delete */}
                <ConfirmDialog
                  title="Delete this user?"
                  description="Their account will be soft-deleted and they will no longer be able to sign in."
                  confirmLabel="Delete user"
                  variant="destructive"
                  trigger={
                    <Button
                      size="icon"
                      variant="destructive"
                      disabled={loadingId === user.id}
                      type="button"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  }
                  onConfirm={() => handleDelete(user.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between border-t border-border p-4 text-sm">
        <p className="text-muted-foreground">
          Showing {(safePage - 1) * pageSize + (paginatedUsers.length ? 1 : 0)}-
          {(safePage - 1) * pageSize + paginatedUsers.length} of {filteredUsers.length}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={safePage <= 1}
          >
            Prev
          </Button>
          <span className="px-2 text-muted-foreground">
            {safePage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={safePage >= totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}