"use client";

import React from "react";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn, useSession } from "next-auth/react";

import {
  useQuizGameModalState,
  useQuizGameState,
  useUserNicknameState,
} from "@/state/quiz-game";
import { addNickname } from "@/lib/user-api";
import { cn } from "@/lib/utils";

import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";

interface QuizGameModalProps {
  id: string;
}

const nicknameSchema = z.object({
  nickname: z
    .string({ required_error: "Nickname is required." })
    .nonempty("Nickname is required")
    .regex(/^[a-zA-Z0-9]+$/, "Only letters and numbers are allowed.")
    .min(4, "Nickname must be at least 4 characters")
    .max(12, "Nickname should be less than 12 characters"),
});

const QuizGameModal = ({ id }: QuizGameModalProps) => {
  const { setGameState } = useQuizGameState();
  const { isOpen, setIsOpen } = useQuizGameModalState();
  const { nickname, setNickname } = useUserNicknameState();
  const [isMounted, setIsMounted] = React.useState(false);
  const { data: session, update } = useSession();
  const user = session?.user;
  const queryClient = useQueryClient();

  async function updateSession(nickname: string) {
    await update({
      ...session?.user.info,
      nickname: nickname,
    });
  }

  const addNicknameMutation = useMutation({
    mutationFn: addNickname,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  const form = useForm<z.infer<typeof nicknameSchema>>({
    resolver: zodResolver(nicknameSchema),
    defaultValues: {
      nickname: "",
    },
    mode: "onChange",
  });

  React.useEffect(() => {
    setIsMounted(true);
    if (isMounted) {
      if ((user && !user.info.nickname) || (!user && !nickname)) {
        setIsOpen(true);
        setGameState("initial");
      } else {
        console.log("else");
        setIsOpen(false);
        setGameState("playing");
      }
    }
  }, [user, nickname]);

  if (!isMounted) {
    return null;
  }

  function onSubmit(values: z.infer<typeof nicknameSchema>) {
    if (user && !user.info.nickname) {
      addNicknameMutation.mutate({
        accessToken: user.accessToken,
        userId: user.info.id,
        nickname: values.nickname,
      });
      updateSession(values.nickname);
      setIsOpen(false);
    } else if (!nickname) {
      setNickname(values.nickname);
    } else {
      console.log("Error at onSubmit quiz-game-modal");
    }
  }

  return (
    <div>
      <AlertDialog open={isOpen}>
        <AlertDialogContent className="max-w-[450px] mx-auto w-full p-8">
          {!user && !nickname ? (
            <>
              <Link
                href={`/quizzes/${id}`}
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "w-fit -translate-x-4 text-muted-foreground hover:text-foreground"
                )}
              >
                Cancel
              </Link>
              <div className="space-y-8 ">
                <Button onClick={() => signIn()} className="w-full">
                  Continue with Google
                </Button>

                <div className="flex items-center gap-4 px-4">
                  <hr className="w-full" />

                  <p className="text-muted-foreground">or</p>
                  <hr className="w-full" />
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="nickname"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter your nickname"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            This is your public display name.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" variant="outline" className="w-full">
                      Continue as Guest
                    </Button>
                  </form>
                </Form>
              </div>
            </>
          ) : user && !user.info.nickname ? (
            <>
              <Link
                href={`/quizzes/${id}`}
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "w-fit -translate-x-4 text-muted-foreground hover:text-foreground"
                )}
              >
                Cancel
              </Link>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="nickname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nickname</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your nickname" {...field} />
                        </FormControl>
                        <FormDescription>
                          You can change this in your dashboard settings.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Continue
                  </Button>
                </form>
              </Form>
            </>
          ) : (
            <>An error has occured. Try to refresh the page.</>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export { QuizGameModal };
