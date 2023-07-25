import { useRouter } from "next/navigation";
import { useExitGameModal } from "@/hooks/use-exit-game-modal";

import { Modal } from "@/components/modal/dialog-modal";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ExitGameModal = () => {
  const { onClose, isOpen, lessonId } = useExitGameModal();
  const router = useRouter();
  if (!lessonId) return null;

  const handleExitGame = () => {
    router.push(`/lesson?id=${lessonId}`);
    onClose();
  };
  return (
    <Modal
      title="Are you sure you want to exit the game?"
      description="Your quiz progress and any earned achievements will be lost."
      onClose={onClose}
      isOpen={isOpen}
    >
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={() => handleExitGame()}>Continue</Button>
      </DialogFooter>
    </Modal>
  );
};

export { ExitGameModal };
