import { withMiddlewareAuth } from '@supabase/auth-helpers-nextjs';

// Trigger this middleware to run on the `/secret-page` route
export const config = {
  matcher:  ['/admin', '/admin/:path', '/admin/:path*']
};

export const middleware = withMiddlewareAuth({
  authGuard: {
    isPermitted: async (user) => {


const admins = ['khibanyakallo@gmail.com', 'ncbphi001@gmail.com']



        if(user.email) {
        return  admins.includes(user.email)
      } else {
        return false
      }
    },
    redirectTo: '/'
  }
});
