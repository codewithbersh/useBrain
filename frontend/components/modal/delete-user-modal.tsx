"use client";

import type { Session } from "next-auth";
import { useDeleteUserModal } from "@/hooks/use-delete-user-modal";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "@/lib/user";
import { signOut } from "next-auth/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DeleteUserSchema } from "@/lib/schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Modal } from "@/components/modal/dialog-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface DeleteUserModalProps {
  session: Session;
}

const DeleteUserModal = ({ session }: DeleteUserModalProps) => {
  const { onClose, isOpen } = useDeleteUserModal();

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      onClose();
      signOut({ callbackUrl: "/login" });
    },
  });

  const form = useForm<z.infer<typeof DeleteUserSchema>>({
    resolver: zodResolver(DeleteUserSchema),
    defaultValues: {
      verification: "",
    },
    mode: "onChange",
  });

  const onSubmit = () => {
    deleteUserMutation.mutate({
      userId: session.user.info.id,
      accessToken: session.user.accessToken,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Are you sure you want to delete your account?"
      description="This action cannot be undone. We will immediately delete all of your
  account data."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="verification"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">
                  To verify, enter
                  <FormLabel className="font-bold">
                    {" "}
                    delete my account
                  </FormLabel>{" "}
                  below
                </FormLabel>
                <FormControl>
                  <Input placeholder="delete my account" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <DialogFooter className="gap-y-2 sm:gap-y-0">
            <Button type="reset" variant="outline">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="destructive"
              disabled={!form.formState.isValid}
            >
              Delete account
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </Modal>
  );
};

export { DeleteUserModal };
