import { withMiddlewareAuth } from '@supabase/auth-helpers-nextjs';

// Trigger this middleware to run on the `/secret-page` route
export const config = {
  matcher:  ['/admin', '/admin/:path', '/admin/:path*']
};

export const middleware = withMiddlewareAuth({
  authGuard: {
    isPermitted: async (user) => {


      return user.email?.endsWith('ncbphi001@gmail.com' ) || user.email?.endsWith('khibanyakallo@gmail.com') ?? false;
    },
    redirectTo: '/'
  }
});
