import { DashboardTabs } from "@/components/dashboard-tabs";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const user = session!.user;

  return (
    <div className="min-h-screen bg-background">
      <DashboardTabs />
    </div>
  );
}
