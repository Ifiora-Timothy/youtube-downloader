import NextAuth from 'next-auth';
import { authOptions } from './auth.config';
 
export default NextAuth(authOptions).auth;
 
export const config = {

  // return await updateSession(request);
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};