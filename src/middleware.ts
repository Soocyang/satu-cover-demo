import { auth } from '@/auth';
import { PUBLIC_ROUTES } from '@/configs/routes';

export default auth((req) => {
  if (!req.auth && !PUBLIC_ROUTES.includes(req.nextUrl.pathname)) {
    const newUrl = new URL('/unauthorized', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
};
