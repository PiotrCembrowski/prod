import DashboardShell from "@/components/dashboard-tabs";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) {
    console.log("❌ Dashboard Access Denied");
    console.log("   Cookie Header:", headersList.get("cookie"));
    redirect("/login");
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-background">
      <DashboardShell user={user} />
    </div>
  );
}
