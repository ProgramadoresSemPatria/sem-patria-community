type DashboardLayoutProps = {
  children?: React.ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="container flex-1 gap-12">
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
}
