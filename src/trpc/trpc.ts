import getUserSession from "@/app/server/getUserSession";
import { TRPCError, initTRPC } from "@trpc/server";

const t = initTRPC.create()
const middleware =t.middleware

const isAuth=middleware(async(opts)=>{
    const currUserSession=  await getUserSession()
    console.log(currUserSession,"from trpc pages")
    

    if( !currUserSession ){
        console.log("no user");
        
        throw new TRPCError({
            code:"UNAUTHORIZED",
            message:"please login to continue"
        })
    }
    const {user}= currUserSession
    if(!user || !user.id){
        console.log("no user");
        
        throw new TRPCError({
            code:"UNAUTHORIZED",
            message:"please relogin to continue"
        })
    }

    return opts.next({
        ctx:{
            userId:user.id,
            user,
        }
    })
})







export const router= t.router;
export const publicProcedure= t.procedure;
export const privateProcedure=t.procedure.use(isAuth)