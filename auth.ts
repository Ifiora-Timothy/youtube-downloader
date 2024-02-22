import NextAuth from 'next-auth';
import { authOptions } from './auth.config'
import { JWT } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

export const { handlers: { GET, POST },
  auth,
  signIn,
  signOut } = NextAuth({
    session: {
      strategy: "jwt",
      maxAge: 10, // 10 secs
      updateAge: 2, // 10 secs
    },
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        console.log("reached signIn")
        return true
      }
      ,
      async redirect({ url, baseUrl }) {
        console.log("reached dd4");
        console.log(url, baseUrl)
        if (url.startsWith("/")) return `${baseUrl}${url}`
        else if (new URL(url).origin === baseUrl) return url
        // return url.startsWith(baseUrl)?url:baseUrl
        return baseUrl
      }
      ,

      async jwt({ token, trigger,account, session }) : Promise<JWT> {
        if (trigger === "update" && session?.name) {
          // Note, that `session` can be any arbitrary object, remember to validate it!
          token.name = session.name
        }
        if (account && account.type === 'credentials') {
          token.userId = account.providerAccountId;
          console.log('reached jwt1',session)
        }
        return token
      },
     
      async session({ session, token, user }) {
        session.user.id = token.userId;
console.log(session,"session")
        return session;
      },


    },
    events:{
      async signIn({ user, account, profile, isNewUser }) {
        console.log("reached signIn event")
      },
      async signOut(message) {
        console.log("reached signOut event")
        
      },
      async updateUser({ user }) {
        console.log("reached updateUser event")
       
      }
      ,
      async createUser({ user }) {
        console.log("reached createUse eventr")
       
      },
      async linkAccount({ user, account, profile }) {
        console.log("reached linkAccount event")
       
      },
      async session({ session }) {
        console.log("reached session event")
       
      }
    },
    pages: {
      signIn: '/login',
    },
    ...authOptions,
  });


