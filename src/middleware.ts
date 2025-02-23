import { auth } from '@/auth';
import { CONFIGS } from './lib/configs';
import { PublicRoutes } from './types/common';

export default auth((req) => {
  if (
    !req.auth &&
    !CONFIGS.PUBLIC_ROUTES.includes(req.nextUrl.pathname as PublicRoutes)
  ) {
    const newUrl = new URL('/unauthorized', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
};
