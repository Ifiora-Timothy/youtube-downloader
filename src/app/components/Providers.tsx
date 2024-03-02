"use client"

import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { PropsWithChildren, useState } from "react"
import { toast } from "sonner"
import { trpc } from "../_trpc/client"

const Providers = ({ children }: PropsWithChildren) => {
    const pathname= usePathname()
    const params = useSearchParams()
    const router=useRouter()


    const [queryClient] = useState(() => new QueryClient({
       queryCache:new QueryCache({
        onError:(error,query)=>{
            console.log(error,query.state,"error here");
            if(error.message.includes("login")){
                const newParams=new URLSearchParams(params.toString())
                newParams.set('origin',pathname)

                toast.error(error.message,{
                   action:{
                       label:'Login',
                       onClick:()=>router.push(`login/?${newParams.toString()}`),
                   },
                   duration:5000,
                   className:"toastError"
                })   
               }
               else{
                            if(query.state.data!== undefined){
           
                 toast.error(`something went wrong ${error.message}`)   
                
                
            }else{
//TODO:remove this else block before production

                toast.error(`${error.message}`)
            }
               }

        }
       })
    }))
    const [trpcClient] = useState(() => trpc.createClient({
        links: [
            httpBatchLink({
                url: "http://localhost:3000/api/trpc",
            })
        ],
    }))
    return (

        <trpc.Provider queryClient={queryClient} client={trpcClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    )
}

export default Providers