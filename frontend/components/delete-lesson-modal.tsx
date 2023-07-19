"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useDeleteLessonModal } from "@/hooks/use-delete-lesson-modal";
import { deleteMyLesson } from "@/lib/lesson";
import { deleteLessonSchema } from "@/lib/schema";

import { Modal } from "@/components/dialog-modal";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";

const DeleteLessonModal = () => {
  const queryClient = useQueryClient();
  const { isOpen, onClose, lesson } = useDeleteLessonModal();

  const deleteLessonMutation = useMutation({
    mutationFn: deleteMyLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-lessons"] });
      onClose();
    },
  });

  const form = useForm<z.infer<typeof deleteLessonSchema>>({
    resolver: zodResolver(deleteLessonSchema),
    defaultValues: {
      verification: "",
    },
    mode: "onChange",
  });

  const handleClose = () => {
    onClose();
    form.clearErrors();
  };

  const onSubmit = (values: z.infer<typeof deleteLessonSchema>) => {
    deleteLessonMutation.mutate(lesson!.id);
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Are you sure you want to delete this lesson?"
      description="This action is irreversible and will permanently remove the lesson along with all associated data."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="verification"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={
                    form.formState.errors.verification && "text-foreground"
                  }
                >
                  Type <span className="font-bold">delete lesson</span> to
                  confirm
                </FormLabel>
                <FormControl>
                  <Input placeholder="delete lesson" {...field} />
                </FormControl>
                <FormDescription className="text-destructive bg-red-50 px-2 py-2 rounded-md">
                  Warning: This will delete{" "}
                  <span className="font-bold ">{lesson?.title}</span>
                </FormDescription>
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => handleClose()}>
              Cancel
            </Button>
            <Button type="submit" disabled={!form.formState.isValid}>
              Delete lesson
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </Modal>
  );
};

export { DeleteLessonModal };
