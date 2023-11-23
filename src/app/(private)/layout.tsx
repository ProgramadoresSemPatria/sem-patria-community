import MainNav from "@/components/main-nav";
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
          <MainNav />
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>
      {children}
    </div>
  );
}
