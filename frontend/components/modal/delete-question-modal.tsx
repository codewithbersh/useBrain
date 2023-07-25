import type { Session } from "next-auth";
import { useDeleteQuestionModal } from "@/hooks/use-delete-question-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQuestion } from "@/lib/question";

import { Modal } from "@/components/modal/dialog-modal";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteQuestionModalProps {
  session: Session;
}

const DeleteQuestionModal = ({ session }: DeleteQuestionModalProps) => {
  const { isOpen, question, onClose } = useDeleteQuestionModal();
  const queryClient = useQueryClient();

  const deleteQuestionMutation = useMutation({
    mutationFn: deleteQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-lessons"] });
      queryClient.invalidateQueries({ queryKey: ["lesson", question?.lesson] });
    },
  });

  if (!question) return null;

  const handleDeleteQuestion = () => {
    deleteQuestionMutation.mutate({
      accessToken: session.user.accessToken,
      questionId: question.id,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Are you sure you want to delete this question?"
      description="Deleting this question will delete its data."
    >
      <DialogFooter>
        <Button variant="outline" onClick={() => onClose()}>
          Cancel
        </Button>
        <Button onClick={() => handleDeleteQuestion()}>Delete</Button>
      </DialogFooter>
    </Modal>
  );
};

export { DeleteQuestionModal };
