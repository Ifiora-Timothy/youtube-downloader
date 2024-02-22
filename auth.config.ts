import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import dbConnect from '@/app/lib/dbConnect';
import { user} from '@/app/lib/models/user';
import credentials from 'next-auth/providers/credentials';
export const authOptions = {
   
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {  },
                password: { },
            },
            async authorize(credentials, req) {
                console.log("reached 4");
                //use mngse shhema  valids
                const email = credentials?.email; // Declare the 'password' variable
                const password = credentials?.password; // Declare the 'password' variable
                
                  
                    await dbConnect();
                     // @ts-ignore
                    const resp:User = await user.validateLogin({ email, password });
                    console.log("resp",resp)
                   return resp;
            },
            
        
        }),
        GoogleProvider({                                
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        })

    ], // Add providers with an empty array for now
 
} satisfies NextAuthConfig;