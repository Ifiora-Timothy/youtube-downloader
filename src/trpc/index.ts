import {publicProcedure, router} from './trpc'

export const appRouter=router({
authCallback:publicProcedure.query(()=>{
    
})

});

export type AppRouter = typeof appRouter;