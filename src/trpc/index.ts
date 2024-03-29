import { FormData } from "@/app/components/Signup";
import dbConnect from "@/app/lib/dbConnect";
import { user } from "@/app/lib/models/user";
import {
  getPlaylistInfo,
  getSearchInfo,
  getVideoInfo,
} from "@/app/lib/yt/ytdlUtils";
import ytdl from "@distube/ytdl-core";
import ytpl from "@distube/ytpl";
import { TRPCError } from "@trpc/server";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { z } from "zod";
import { auth, signIn } from "../../auth";
import { privateProcedure, publicProcedure, router } from "./trpc";

export const appRouter = router({
  authSignup: publicProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string().email(),
        password: z.string(),
        credentials: z.boolean(),
      })
    )
    .mutation(async (opts) => {
      const { username, email, password, credentials } = opts.input;

      try {
        await dbConnect();

        //@ts-ignore
        const resp: FormData = await user.createUser({
          username,
          email,
          password,
          credentials,
        });
        //TODO: validate using mongoose schema validtaion

        //TODO: if not throw trpc unauthorised error

        //TODO:send an email for validation

        //TODO:create a redirect link

        //TODO:user is asked to relogin

        //TODO:create the session

        //TODO: return successcallbaxk
        return resp;
      } catch (err: any) {
        // throw  new TRPCError({
        //     code: "UNAUTHORIZED",
        //     message:err.message,
        //   })
        return err.message;
      }
    }),
  authLogin: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async (opts) => {
      const form = opts.input;
      const { email, password } = form;
      try {
        const res = await signIn("credentials", {
          email: email,
          password: password,
          redirect: false,
        });
        const session = await auth();
        return { message: "success" };
      } catch (err: any) {
        if (isRedirectError(err)) {
          throw new TRPCError({
            code: "METHOD_NOT_SUPPORTED",
            message: err.message,
          });
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
              });
          }
        }

        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: err.message,
        });
        // return err.message
      }
    }),

  getVideoInfo: privateProcedure
    .input(
      z.object({
        text: z.string().startsWith("https://"),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        if (ytpl.validateID(input.text)) {
          //is a playlist get the playlist details
          const playlistInfo = await getPlaylistInfo(input.text);
          if (playlistInfo instanceof Error) {
            console.log(playlistInfo.message, "index page");
            throw new TRPCError({
              code: "UNAUTHORIZED",
              message: playlistInfo.message,
            });
          }
          return { vidInfo: playlistInfo };
        } else if (ytdl.validateURL(input.text)) {
          //  it is a video
          const vidInfo = await getVideoInfo(input.text);
          if (vidInfo instanceof Error) {
            throw new TRPCError({
              code: "UNAUTHORIZED",
              message: vidInfo.message,
            });
          }
          return { vidInfo };
        } else {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "invalid url",
          });
        }
      } catch (err: any) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: err.message,
        });
      }
    }),
  getSearchInfo: privateProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const vidInfo: any = await getSearchInfo(input.text);   
        if (vidInfo instanceof Error) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: vidInfo.message,
          });
        }
        return { vidInfo };
      } catch (err: any) {
        if (err instanceof TRPCError) {
          throw new TRPCError({
            cause: err.cause,
            code: err.code,
            message: err.message,
          });
        }
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: err.message,
        });
      }
    }),
});

export type AppRouter = typeof appRouter;
