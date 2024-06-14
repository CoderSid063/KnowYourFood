import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

// Middleware function to handle routing based on user authentication
export async function middleware(request) {
  const token = await getToken({ req: request });
  console.log(token);
  const path = request.nextUrl.pathname; // Get the current request path

  // Define public paths that do not require authentication
  const isPublicPath =
    path === "/sign-in" || path === "/signup" || path === "/";

  // Retrieve the token from cookies
  // const token = request.cookies.get("token")?.value || "";

  // If the user is authenticated and tries to access a public path, redirect to home page
  if ((path === "/sign-in" || path === "/signup") && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // If the user is not authenticated and tries to access a protected path, redirect to login page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
  }

  // If the path and authentication status are valid, allow the request to proceed
}

// Configuration for the middleware, specifying which paths to match
export const config = {
  matcher: ["/", "/profile", "/sign-in", "/signup"], // Paths that this middleware should apply to
};
