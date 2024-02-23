import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import dbConnect from '@/app/lib/dbConnect';
import { user} from '@/app/lib/models/user';
import credentials from 'next-auth/providers/credentials';
import { TRPCError } from '@trpc/server';
export const authOptions = {
   
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {  },
                password: { },
            },
            async authorize(credentials, req) {
                //use mngse shhema  valids
                const email = credentials?.email; // Declare the 'password' variable
                const password = credentials?.password; // Declare the 'password' variable
                
                  try{
                    await dbConnect();
                    // @ts-ignore
                   const resp:User = await user.validateLogin({ email, password });
                 
                   if(resp instanceof Error){
                    throw new TRPCError({
                        code: "UNAUTHORIZED",
                        message: resp.message,
                    })
                   }
                  return resp;
                  }
                  catch(err:any){
                    throw new TRPCError({
                        code: "UNAUTHORIZED",
                        message: err.message,
                    })
                  }
                    
            },
            
        
        }),
        GoogleProvider({                                
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        })

    ], // Add providers with an empty array for now
 
} satisfies NextAuthConfig;