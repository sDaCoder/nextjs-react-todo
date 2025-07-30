import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
 
export async function middleware(request) {
	const sessionCookie = getSessionCookie(request);
 
    // THIS IS NOT SECURE!
    // This is the recommended approach to optimistically redirect users
    // We recommend handling auth checks in each page/route
	if (!sessionCookie) {
		return NextResponse.redirect(new URL("/", request.url));
	}
 
	return NextResponse.next();
}
 
export const config = {
	matcher: ["/dashboard", "/tasks"], // Specify the routes the middleware applies to
};