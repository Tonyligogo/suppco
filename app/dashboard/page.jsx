import { getCurrentUser } from "@/lib/getUser";
import { redirect, RedirectType } from "next/navigation";

const Page = async () => {
  const user = await getCurrentUser();
  const accountType = user?.account_type;
  const id = user?.id;

  if (!id) {
    redirect("/login", RedirectType.replace);
  }
  if (accountType === "SUPPLIER") {
    redirect(`/dashboard/supplier/${id}`, RedirectType.replace);
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-primary"></div>
    </div>
  )
};

export default Page;
