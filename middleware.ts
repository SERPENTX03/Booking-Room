import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/auth/login", "/auth/register",],
};

export async function middleware(req:any) {
  const session = await auth();
  const user = session?.user

  // ✅ ถ้าผู้ใช้ล็อกอินแล้ว และพยายามเข้าหน้า Login/Register → Redirect ไปหน้า Home `/`
  if (user && ["/auth/login", "/auth/register"].includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next(); // ✅ อนุญาตให้เข้าหน้าอื่น ๆ ได้
}

