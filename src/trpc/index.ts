
import { FormData } from '@/app/components/Signup';
import dbConnect from '@/app/lib/dbConnect';
import { user } from '@/app/lib/models/user';
import { getVideoInfo } from '@/app/lib/yt/ytdlUtils';
import { TRPCError } from '@trpc/server';
import { AuthError } from 'next-auth';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { z } from 'zod';
import { auth, signIn } from '../../auth';
import { privateProcedure, publicProcedure, router } from './trpc';


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
            const res = await signIn('credentials', { email: email, password: password, redirect: false });
            const session = await auth()
            return { message: "success" }
        }
        catch (err: any) {

            if (isRedirectError(err)) {
                throw new TRPCError({
                    code: "METHOD_NOT_SUPPORTED",
                    message: err.message,
                })

            }
            if (err instanceof Error) {
                const { type, cause, message } = err as AuthError;
                switch (type) {
                    case "CredentialsSignin":
                        throw new TRPCError({
                            code: "UNAUTHORIZED",
                            message: "iNVALID CREDENTIALS",
                        });
                    case "CallbackRouteError":
                        throw new TRPCError({
                            code: "UNAUTHORIZED",
                            message: cause?.err?.message,
                        });

                    default:
                        throw new TRPCError({
                            code: "UNAUTHORIZED",
                            message: err.message,
                        })
                }
            }

            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: err.message,
            })
            // return err.message

        }
    }),
    getVideoInfo: privateProcedure.input(
        z.object({
            url: z.string().startsWith("https://"),
        })
    ).query(async ({ ctx, input }) => {
        const { userId, user: userInfo } = ctx
        try {

            await dbConnect()

            //@ts-ignore
            const resp:any = await user.findByEmailAndUsername({ username: userInfo.name, email: userInfo.email })
          
            if (resp.success) {
                const vidInfo = await getVideoInfo(input.url)
               // console.log(vidInfo,"index page");
                
                return {vidInfo}
            }
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "unknown cause",
            })

        }
        catch (err: any) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: err.message,
            })
        }

    })

});

export type AppRouter = typeof appRouter;