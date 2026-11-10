
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const lang = pathname.split("/")[1];

  const supportedLanguages = ["en", "tr", "de", "ru", "ar"];

  const language = supportedLanguages.includes(lang)
    ? lang
    : "en";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-site-language", language);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/en/:path*", "/tr/:path*", "/de/:path*", "/ru/:path*", "/ar/:path*"],
};
