// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {  supabaseClient } from '@supabase/auth-helpers-nextjs';



// Trigger this middleware to run on the `/secret-page` route
export const config = {
  matcher:  ['/admin', '/admin/:path', '/admin/:path*']
};

export async function middleware(req: NextRequest) {



  const JWT = req.cookies.get('sb-access-token') || 'Nothing'

  const {user, error} = await supabaseClient.auth.api.getUser(JWT)

  console.log({user,error})
  if (user?.email === 'khibanyakallo@gmail.com' || user?.email === 'ncbphi001@gmail.com') {

    return NextResponse.rewrite(req.nextUrl);
    // Rewrite to URL
  } else {
    req.nextUrl.pathname = '/';
    return NextResponse.rewrite(req.nextUrl);
  }

}
