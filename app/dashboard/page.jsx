import { getCurrentUser } from "@/lib/getUser";
import { redirect, RedirectType } from "next/navigation";

const Page = async () => {
  const user = await getCurrentUser();
  const accountType = user?.account_type;
  const id = user?.id;

  if (!id) {
    redirect("/login", RedirectType.replace);
  }

  if(!user.is_active){
    return (
      <div className="grid place-content-center text-center">
        <h1>Your account is not active.</h1>
        <p>Please contact support for more information on how to activate your account.</p>
      </div>
    )
  }

  switch(accountType){
    case 'SUPPLIER':
      redirect(`/dashboard/supplier/${id}`, RedirectType.replace);
      break;
    case 'CONTRACTOR':
      redirect(`/dashboard/contractor/${id}`, RedirectType.replace);
      break;
    case 'EMPLOYEE':
      redirect(`/dashboard/employee/${id}`, RedirectType.replace);
      break;
    case 'user':
      redirect(`/dashboard/admin/${id}`, RedirectType.replace);
      break;
    default:
      redirect('/account-not-found',RedirectType.replace);
  }
  
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-primary"></div>
    </div>
  )
};

export default Page;
