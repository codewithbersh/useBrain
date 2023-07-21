"use client";

import { useEffect, useState } from "react";
import { getUserInfo, updateUserNickname } from "@/lib/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Session } from "next-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NicknameSchema } from "@/lib/schema";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useDeleteUserModal } from "@/hooks/use-delete-user-modal";

type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  nickname: string;
};

interface ManageAccountSettingsProps {
  session: Session;
  initialData: User;
}

const ManageAccountSettings = ({
  session,
  initialData,
}: ManageAccountSettingsProps) => {
  const [disabled, setDisabled] = useState(false);
  const { toast } = useToast();
  const { onOpen } = useDeleteUserModal();

  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserInfo(session.user.accessToken),
    initialData: initialData,
  });

  const form = useForm<z.infer<typeof NicknameSchema>>({
    resolver: zodResolver(NicknameSchema),
    defaultValues: {
      nickname: user.nickname,
    },
    mode: "onChange",
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUserNickname,
    onSuccess: (values) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast({
        title: "Saved successfully",
        description: `Nickname updated to ${values.nickname}`,
      });
      setDisabled(true);
    },
  });

  const onSubmit = (values: z.infer<typeof NicknameSchema>) => {
    updateUserMutation.mutate({
      accessToken: session.user.accessToken,
      userId: user.id,
      nickname: values.nickname,
    });
  };

  useEffect(() => {
    const timeout = 5000;

    const timeoutId = setTimeout(() => {
      setDisabled(false);
    }, timeout);

    return () => clearTimeout(timeoutId);
  }, [disabled]);

  const handleDeleteModal = () => {
    onOpen();
  };
  return (
    <div className="space-y-12">
      <div className="space-y-2 ">
        <h1 className="font-bold text-lg">Change display name</h1>
        <hr />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6 translate-y-2"
          >
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Nickname" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={disabled}>
              {disabled ? "Saved" : "Save"}
            </Button>
          </form>
        </Form>
      </div>

      <div className="space-y-2">
        <h1 className="font-bold text-lg">Delete account</h1>
        <hr />
        <p className="text-muted-foreground text-sm">
          This is a danger zone. Deleting your account will delete all of your
          data.
        </p>
        <Button variant="destructive" onClick={() => handleDeleteModal()}>
          Delete my account
        </Button>
      </div>
    </div>
  );
};

export { ManageAccountSettings };
