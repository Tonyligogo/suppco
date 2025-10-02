import { NextResponse } from "next/server";
import { auth } from "./auth";
export default async function middleware(req){
    const { pathname } = req.nextUrl;
    const session = await auth();
    const isDashboardRoute = pathname.startsWith("/dashboard");

    if (isDashboardRoute && !session) {
        return NextResponse.redirect(new URL("/login", req.nextUrl)); 
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
      "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
      "/dashboard/:path*",
    ],
};