import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === "/" || path === "/createNewPassword" || path === "/verifyEmail";

  const token = request.cookies.get("token")?.value || "";

  // if (isPublicPath && token) {
  //   return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  // }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/",
    "/verifyEmail",
    "/createNewPassword",
    "/dashboard",
    "/dashboard/domain",
    "/dashboard/domain/marketplace",
    "/dashboard/analytics",
    "/dashboard/links",
    "/dashboard/Cosmos",
    "/dashboard/settings",
    "/dashboard/settings/payment",
    "/dashboard/settings/transaction",
  ],
};
