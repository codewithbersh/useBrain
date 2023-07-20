"use client";

import { useEffect, useState } from "react";
import { DeleteLessonModal } from "@/components/delete-lesson-modal";
import { ManageQuestionModal } from "@/components/manage-question-modal";
import { DeleteQuestionModal } from "@/components/delete-question-modal";
import { useSession } from "next-auth/react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  if (!session) return null;
  return (
    <>
      <DeleteLessonModal session={session} />
      <ManageQuestionModal session={session} />
      <DeleteQuestionModal session={session} />
    </>
  );
};

export default ModalProvider;
