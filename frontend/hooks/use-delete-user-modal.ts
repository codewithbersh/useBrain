import { create } from "zustand";

interface DeleteUserModal {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useDeleteUserModal = create<DeleteUserModal>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
