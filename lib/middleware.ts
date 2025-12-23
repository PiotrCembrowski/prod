// middleware.ts
import { auth } from "./auth";
import { NextResponse } from "next/server";

export async function middleware(request: Request) {
  // ⚠️ This often fails on Edge runtimes without specific plugins
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
