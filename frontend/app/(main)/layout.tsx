import { SiteHeader } from "@/components/site-header";
import { SideNav } from "@/components/side-nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <SiteHeader />

      <div className="flex gap-8 lg:gap-12 container relative">
        <div className="min-h-[calc(100vh-72px)] hidden sm:block">
          <SideNav />
        </div>

        <div className="flex-1 overflow-hidden pl-1">{children}</div>
      </div>
    </section>
  );
}
