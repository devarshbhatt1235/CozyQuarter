import { create } from "zustand";

interface LoginModalStore {
  isOpen: boolean;
  email: string;
  password: string;
  onOpen: () => void;
  onClose: () => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

const useLoginModal = create<LoginModalStore>((set) => ({
  isOpen: false,
  email: '',
  password: '',
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, email: '', password: '' }),
  setEmail: (email: string) => set({ email }),
  setPassword: (password: string) => set({ password }),
}));

export default useLoginModal;
