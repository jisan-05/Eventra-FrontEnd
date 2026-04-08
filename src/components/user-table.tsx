/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
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

interface Props {
  users: any[];
}

export default function UserTable({ users }: Props) {
  const [userList, setUserList] = useState(users);
  const [loadingId, setLoadingId] = useState<string | null>(null);

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

  return (
    <div className="bg-card rounded-2xl shadow-md border border-border">
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
          {userList.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                No users found
              </TableCell>
            </TableRow>
          )}

          {userList.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    user.role === "ADMIN"
                      ? "bg-purple-100 text-purple-600"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {user.role}
                </span>
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
    </div>
  );
}