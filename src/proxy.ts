import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale } from "@/i18n/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const prefix = `/${defaultLocale}`;

  if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(prefix.length) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `${prefix}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api/|_next/|.*\\..*).*)"],
};
