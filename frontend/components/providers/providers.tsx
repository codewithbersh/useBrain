import SessionProvider from "@/components/providers/session-provider";
import MyQueryClientProvider from "@/components/providers/queryclient-provider";
import ModalProvider from "@/components/providers/modal-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      <MyQueryClientProvider>
        {children}
        <ModalProvider />
      </MyQueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
