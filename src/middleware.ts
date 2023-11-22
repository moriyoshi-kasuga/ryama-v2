import { NextResponse, type NextRequest } from 'next/server';
import { createMiddlewareSupabase } from './lib/supabase/middleware';

export function isProtectedRoute(path: string) {
	return path.startsWith('/dashboard') || path.startsWith('/workspace');
}

export async function middleware(request: NextRequest) {
	try {
		const { supabase, response } = createMiddlewareSupabase(request);

		const {
			data: { session },
		} = await supabase.auth.getSession();

		if (!session && isProtectedRoute(request.nextUrl.pathname)) {
			return NextResponse.redirect(new URL('/signin', request.url));
		}

		if (session && !isProtectedRoute(request.nextUrl.pathname)) {
			return NextResponse.redirect(new URL('/workspace', request.url));
		}

		return response;
	} catch (e) {
		return NextResponse.next({
			request: {
				headers: request.headers,
			},
		});
	}
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
  ],
}
