"use client";

import { useEffect, useState } from "react";
import { DeleteLessonModal } from "@/components/delete-lesson-modal";
import { ManageQuestionModal } from "@/components/manage-question-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <>
      <DeleteLessonModal />
      <ManageQuestionModal />
    </>
  );
};

export default ModalProvider;
