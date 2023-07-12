"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useQuizGameModalState, useUserNicknameState } from "@/state/quiz-game";
import { Session } from "next-auth";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { Icons } from "./icons";

interface QuizGameModalProps {
  session: Session | null;
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

const QuizGameModal = ({ session, id }: QuizGameModalProps) => {
  const { isOpen, setIsOpen } = useQuizGameModalState();
  const { nickname, setNickname } = useUserNicknameState();
  const [isMounted, setIsMounted] = React.useState(false);

  const form = useForm<z.infer<typeof nicknameSchema>>({
    resolver: zodResolver(nicknameSchema),
    defaultValues: {
      nickname: "",
    },
    mode: "onChange",
  });
  React.useEffect(() => {
    setIsMounted(true);

    if (session) {
      !session.user_info.nickname ? setIsOpen(true) : setIsOpen(false);
    } else {
      !nickname ? setIsOpen(true) : setIsOpen(false);
    }
  }, [session, nickname]);

  if (!isMounted) {
    return null;
  }

  function onSubmit(values: z.infer<typeof nicknameSchema>) {
    setNickname(values.nickname);
  }

  return (
    <div>
      <AlertDialog open={isOpen}>
        <AlertDialogContent className="max-w-[450px] mx-auto w-full p-8 pt-12">
          {!session && !nickname ? (
            <>
              <Link
                href={`/quizzes/${id}`}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "absolute right-4 top-2"
                )}
              >
                <Icons.xCircle size={24} className="text-foreground" />
              </Link>
              <div className="space-y-4 ">
                <Button onClick={() => signIn()} className="w-full">
                  Continue with Google
                </Button>

                <p className="text-center">or</p>
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
          ) : session && !session.user_info.nickname ? (
            <>
              <Link
                href={`/quizzes/${id}`}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "absolute right-4 top-2"
                )}
              >
                <Icons.xCircle size={24} className="text-foreground" />
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
