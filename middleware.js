import { NextResponse } from "next/server";

// Middleware function to handle routing based on user authentication
export function middleware(request) {
  const path = request.nextUrl.pathname; // Get the current request path

  // Define public paths that do not require authentication
  const isPublicPath = path === "/login" || path === "/signup" || path === "/";

  // Retrieve the token from cookies
  const token = request.cookies.get("token")?.value || "";

  // If the user is authenticated and tries to access a public path, redirect to home page
  if ((path === "/login" || path === "/signup") && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // If the user is not authenticated and tries to access a protected path, redirect to login page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // If the path and authentication status are valid, allow the request to proceed
}

// Configuration for the middleware, specifying which paths to match
export const config = {
  matcher: ["/", "/profile", "/login", "/signup", "/verifyemail"], // Paths that this middleware should apply to
};
