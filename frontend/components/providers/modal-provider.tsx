"use client";

import { useEffect, useState } from "react";
import { DeleteLessonModal } from "@/components/delete-lesson-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <>
      <DeleteLessonModal />
    </>
  );
};

export default ModalProvider;
