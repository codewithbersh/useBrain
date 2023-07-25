"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { DeleteLessonModal } from "@/components/modal/delete-lesson-modal";
import { ManageQuestionModal } from "@/components/modal/manage-question-modal";
import { DeleteQuestionModal } from "@/components/modal/delete-question-modal";
import { DeleteUserModal } from "@/components/modal/delete-user-modal";
import { ExitGameModal } from "@/components/modal/exit-game-modal";

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
      <DeleteUserModal session={session} />
      <ExitGameModal />
    </>
  );
};

export default ModalProvider;
