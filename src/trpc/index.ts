import { FormData } from '@/app/(auth)/signup/page';
import {publicProcedure, router} from './trpc'
import {user} from '@/app/lib/models/user'
import { z } from 'zod';
import dbConnect from '@/app/lib/dbConnect';

export const appRouter=router({
authCallback:publicProcedure.input(
    z.object({
        username:z.string(),
        email:z.string(),
        password:z.string(),
        credentials:z.boolean()
    }),
).mutation(async(opts)=>{

    const {username,email,password,credentials} = opts.input
    try{
        
        await dbConnect()
        //@ts-ignore
        const resp:FormData = user.createUser({username,email,password,credentials})
   
   
    //TODO: validate using mongoose schema validtaion

    //TODO: if not throw trpc unauthorised error

    //TODO:send an email for validation

    //TODO:create a redirect link

    //TODO:user is asked to relogin

    //TODO:create the session

    //TODO: return successcallbaxk
    return resp
    }
    catch(err){
        console.log(err)
    }
    finally{
        console.log('donee')
    }
   

return {success: true}

})

});

export type AppRouter = typeof appRouter;