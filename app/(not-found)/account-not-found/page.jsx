import Link from "next/link"

const AccountNotFound = () => {
  return (
    <div className="h-svh w-full grid place-content-center text-center space-y-2">
        <h1 className="text-xl font-semibold">We had trouble finding your account.</h1>
        <p className="text-lg">Please contact admin to help resolve this.</p>
        <p className="text-md">We apologize for the inconvenience!</p>
        <Link href='/login' className="text-blue-500">Back to login</Link>
    </div>
  )
}

export default AccountNotFound