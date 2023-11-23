import Footer from "@/components/footer";
import MainNav from "@/components/main-nav";
import SidebarNav from "@/components/sidebar-nav";
import { mainNavItems, sidebarNavItems } from "@/lib/constants";
import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type PrivateLayoutProps = {
  children?: React.ReactNode;
};

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={mainNavItems} />
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <Footer className="border-t" />
    </div>
  );
}
