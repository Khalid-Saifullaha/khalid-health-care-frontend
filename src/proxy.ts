import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { userInterface } from "./types/userTypes";

const roleBasedRoutes = {
  ADMIN: ["/admin/dashboard"],
  DOCTOR: ["/doctor/dashboard"],
  PATIENT: [
    "/patient/dashboard",
    "/patient/appointments",
    "/patient/medical-records",
  ],
};

const authRoutes = ["/login", "/register", "/forgot-password"];
export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const { pathname } = request.nextUrl;

  if (!accessToken && !refreshToken && !authRoutes.includes(pathname)) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }

  let user: userInterface | null = null;

  if (accessToken) {
    try {
      user = jwtDecode(accessToken); // {id: string, email: string, role: "ADMIN"| "DOCTOR" | "PATIENT", exp: number, iat: number}
      console.log({ proxyts: user });
    } catch (err) {
      console.log("Error decoding access token:", err);
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/forgot-password"],
};
