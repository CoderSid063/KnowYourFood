import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

// Middleware function to handle routing based on user authentication
export async function middleware(request) {
  const token = await getToken({ req: request });
  const path = request.nextUrl.pathname; // Get the current request path

  // console.log(
  //   `Request path: ${path}, Token: ${token ? "exists" : "not found"}`
  // );

  // Define public paths that do not require authentication
  const isPublicPath =
    path === "/sign-in" || path === "/signup" || path === "/";

  // If the user is authenticated and tries to access a public path, redirect to home page
  if ((path === "/sign-in" || path === "/signup") && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  //If the user is not authenticated and tries to access a protected path, redirect to login page
  if (!isPublicPath && !token) {
    const callbackUrl = encodeURIComponent(path);
    return NextResponse.redirect(
      new URL(`/sign-in?callbackUrl=${callbackUrl}`, request.nextUrl)
    );
  }

  // Allow the request to proceed if the path and authentication status are valid
  return NextResponse.next();
}

// Configuration for the middleware, specifying which paths to match
export const config = {
  matcher: ["/", "/profile", "/sign-in", "/signup", "/meals", "/meals/:path*"], // Paths that this middleware should apply to
};
