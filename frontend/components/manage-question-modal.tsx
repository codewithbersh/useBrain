"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuestionSchema } from "@/lib/schema";
import { useManageQuestionModal } from "@/hooks/use-manage-question-modal";
import { cn } from "@/lib/utils";

import { Modal } from "@/components/dialog-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogFooter } from "@/components/ui/dialog";

const ManageQuestionModal = () => {
  const { isOpen, question, onClose } = useManageQuestionModal();
  const searchParams = useSearchParams();
  const lessonId = searchParams.get("id");
  if (!lessonId) return null;

  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      lesson: lessonId,
      question_text: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (question) {
      form.setValue("question_text", question.question_text);
      form.setValue("lesson", lessonId);
      form.reset({
        question_text: question.question_text,
        lesson: lessonId,
        choices: [
          {
            choice_text: question.choices[0].choice_text,
            is_correct: question.choices[0].is_correct,
          },
          {
            choice_text: question.choices[1].choice_text,
            is_correct: question.choices[1].is_correct,
          },
          {
            choice_text: question.choices[2].choice_text,
            is_correct: question.choices[2].is_correct,
          },
          {
            choice_text: question.choices[3].choice_text,
            is_correct: question.choices[3].is_correct,
          },
        ],
      });
    } else {
      form.reset({
        question_text: "",
        lesson: lessonId,
        choices: [
          { choice_text: "", is_correct: false },
          { choice_text: "", is_correct: false },
          { choice_text: "", is_correct: false },
          { choice_text: "", is_correct: false },
        ],
      });
    }
  }, [question, isOpen]);

  const onSubmit = (values: z.infer<typeof QuestionSchema>) => {
    console.log(values);
  };

  const choices = form.watch("choices");
  const correctChoices =
    choices && choices.filter((choice) => choice.is_correct).length;
  const choicesArray = Array.from({ length: 4 });

  return (
    <Modal
      title="Manage question"
      description="Add/Edit Question"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="question_text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <Input placeholder="Add your question" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <small
              className={cn(
                "text-sm font-medium",
                correctChoices > 1 && "text-destructive"
              )}
            >
              Mark one correct answer below
            </small>
            {choicesArray.map((_, index) => (
              <div key={index} className="flex items-center gap-4">
                <FormField
                  control={form.control}
                  name={`choices.${index}.is_correct` as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange as any}
                          disabled={choices[index].choice_text ? false : true}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`choices.${index}.choice_text` as any}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder="Choice"
                          {...field}
                          className={cn(
                            form.formState.errors.choices?.[index]?.choice_text
                              ? "border-destructive"
                              : ""
                          )}
                          disabled={
                            !form.watch("question_text")
                              ? true
                              : form.formState.errors.question_text
                              ? true
                              : false
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose} type="reset">
              Cancel
            </Button>
            <Button
              disabled={
                correctChoices !== 1
                  ? true
                  : !form.formState.isValid
                  ? true
                  : false
              }
              type="submit"
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </Modal>
  );
};

export { ManageQuestionModal };
