
import { FormData } from '@/app/components/Signup';
import { publicProcedure, router } from './trpc'
import { Users, user } from '@/app/lib/models/user'
import { z } from 'zod';
import dbConnect from '@/app/lib/dbConnect';
import { getSession, login } from '@/app/lib/authFunctions';
import { auth, signIn } from '../../auth';
import { TRPCError } from '@trpc/server';
import { zfd } from 'zod-form-data';
import { AuthError } from 'next-auth';
import { isRedirectError } from 'next/dist/client/components/redirect';


export const appRouter = router({
    authSignup: publicProcedure.input(
        z.object({
            username: z.string(),
            email: z.string().email(),
            password: z.string(),
            credentials: z.boolean()
        }),
    ).mutation(async (opts) => {

        const { username, email, password, credentials } = opts.input

        try {

            await dbConnect()

            //@ts-ignore
            const resp: FormData = await user.createUser({ username, email, password, credentials })
            //TODO: validate using mongoose schema validtaion

            //TODO: if not throw trpc unauthorised error

            //TODO:send an email for validation

            //TODO:create a redirect link

            //TODO:user is asked to relogin

            //TODO:create the session

            //TODO: return successcallbaxk
            return resp
        }
        catch (err: any) {
            // throw  new TRPCError({
            //     code: "UNAUTHORIZED",
            //     message:err.message,
            //   })
            return err.message
        }
    }),
    authLogin: publicProcedure.input(
        z.object({
            email: z.string(),
            password: z.string()
        })
    ).mutation(async (opts) => {
        const form = opts.input
        const { email, password } = form
        try {
            console.log(form)
            const res = await signIn('credentials', {email:email, password: password, redirect: true});
            console.log(res, "authresponse")
            const session = await auth()
            console.log(session,"session")
            return { success: true }
        }
        catch (err: any) {
            if (isRedirectError(err)) {
                console.log("redirect error lol",err);
                throw err

            }
            if (err instanceof Error) {
                const { type, cause } = err as AuthError;
                switch (type) {
                    case "CredentialsSignin":
                        console.log("iNVALID CREDENTIALS")
                        return "iNVALID CREDENTIALS";
                    case "CallbackRouteError":
                        console.log(cause?.err?.toString())
                        return cause?.err?.toString();

                    default:

                        console.log(err.message)
                        throw new TRPCError({
                            code: "UNAUTHORIZED",
                            message: err.message,
                        })
                        return "something went wrong"

                }
            }
            console.log('err reached')
            console.log(err)
            // throw  new TRPCError({
            //     code: "UNAUTHORIZED",
            //     message:err.message,
            //   })
            return err.message

        }


    })

});

export type AppRouter = typeof appRouter;