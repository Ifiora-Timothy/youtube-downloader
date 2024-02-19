import {publicProcedure, router} from './trpc'
import {user} from '@/app/lib/models/user'


export const appRouter=router({
authCallback:publicProcedure.query(()=>{

    try{
        const resp = user.createUser({username:'helll',email:"fffff@dd.com",password:'dddd',conditions:true})
    }
    catch(err){
        console.log(err)
    }
    finally{
        console.log('donee')
    }
   

return {success: true}

    //TODO: validate using mongoose schema validtaion

    //TODO: if not throw trpc unauthorised error

    //TODO:send an email for validation

    //TODO:create a redirect link

    //TODO:user is asked to relogin

    //TODO:create the session

    //TODO: return successcallbaxk
})

});

export type AppRouter = typeof appRouter;