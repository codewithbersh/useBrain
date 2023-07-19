"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CATEGORY_CHOICES, lessonSchema } from "@/lib/schema";
import { createLesson, updateLessonDetail } from "@/lib/lesson";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
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
import { Switch } from "@/components/ui/switch";
import { Icons } from "@/components/icons";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { LessonSummary } from "@/components/lesson-summary";
import { Lesson } from "@/types";

interface NewLessonFormProps {
  lessonId: string | undefined;
  userId: string;
  accessToken: string;
  lesson: Lesson | null | undefined;
}

const NewLessonForm = ({
  lessonId,
  userId,
  accessToken,
  lesson,
}: NewLessonFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<z.infer<typeof lessonSchema>>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: "",
      category: undefined,
      isPublic: false,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (lesson) {
      form.reset({
        title: lesson.title,
        category: lesson.category,
        isPublic: lesson.is_public,
      });
    }
    if (!lessonId) {
      form.reset({
        title: "",
        category: "Others",
        isPublic: false,
      });
    }
  }, [lesson, form]);

  const updateLessonMutation = useMutation({
    mutationFn: updateLessonDetail,
    onSuccess: (value) => {
      queryClient.invalidateQueries({ queryKey: ["lesson", lesson!.id] });
      toast({
        title: "Lesson saved.",
        description: (
          <div className="space-y-2">
            <h1 className="font-bold">{value?.title}</h1>
            <div className="flex gap-4">
              <Badge>{value?.is_public ? "Public" : "Private"}</Badge>
              <Badge variant="outline">{value?.category}</Badge>
            </div>
          </div>
        ),
      });
    },
  });

  const createLessonMutation = useMutation({
    mutationFn: createLesson,
    onSuccess: (values) => {
      queryClient.invalidateQueries({ queryKey: ["my-lessons"] });
      console.log("Values: ", values);
      if (values) {
        router.push(`/lesson?id=${values.id}`);
      }
    },
  });

  function onSubmit(values: z.infer<typeof lessonSchema>) {
    if (lesson) {
      updateLessonMutation.mutate({
        lessonId: lesson.id,
        accessToken: accessToken,
        ...values,
      });
    } else {
      const newLesson = {
        ...values,
        owner: userId,
      };
      console.log("New Lesson: ", newLesson);
      createLessonMutation.mutate(newLesson);
    }
  }

  return (
    <div className="space-y-4">
      <LessonSummary lesson={lesson} />

      <div className=" border-border border rounded-md w-full p-4 sm:p-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-[500px]"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Lesson title" {...field} />
                  </FormControl>
                  <FormDescription>
                    What is this lesson all about?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={(value) =>
                      field.onChange(
                        value as
                          | "General Knowledge"
                          | "Sports"
                          | "Science"
                          | "Others"
                      )
                    }
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue>
                          {field.value || "Select a category"}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORY_CHOICES.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Make public</FormLabel>
                    <FormDescription>
                      Make it public if you want others to view/play this
                      lesson.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="gap-2">
              <Icons.loader
                size={14}
                className={
                  updateLessonMutation.isLoading
                    ? "block animate-spin"
                    : "hidden"
                }
              />
              {updateLessonMutation.isLoading ? "Saving lesson" : "Save lesson"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export { NewLessonForm };
