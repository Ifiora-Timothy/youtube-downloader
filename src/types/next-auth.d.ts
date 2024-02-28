import { DefaultJWT, DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
        }& DefaultSession["user"];
        accessToken:string,
        refreshToken:string,
        expires_at:number,
        error?:"RefreshAccessTokenError"
    }
 
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        userId: string,     
        expires_at:number,
        access_token:string,
        refresh_token:string,
    }
}

declare module "next-auth" {
    interface User  {
        access_token:string,
        refresh_token:string,
        expires_at:number
    }
 
}