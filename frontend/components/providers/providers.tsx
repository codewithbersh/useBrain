import SessionProvider from "@/components/providers/session-provider";
import MyQueryClientProvider from "@/components/providers/queryclient-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      <MyQueryClientProvider>{children}</MyQueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
