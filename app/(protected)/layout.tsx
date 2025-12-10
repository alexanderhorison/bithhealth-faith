import { DashboardNav, DashboardHeader } from "@/components/dashboard-nav";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="pt-16 md:pt-0">
          <DashboardHeader />
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
