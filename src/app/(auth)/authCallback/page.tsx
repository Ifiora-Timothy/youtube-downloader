//ts-worksheet-with-variables
"use client"
import { trpc } from '@/app/_trpc/client'
import { Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    const router = useRouter()
    const searchparams=useSearchParams()
    const origin =searchparams.get('origin')
    console.log(origin)//?
    
    const { data,isError,isLoadingError,isFetched, isLoading } = trpc.authCallback.useQuery(undefined)
    if (data) {
        console.log(data)//?
        console.log("data")
        router.push(origin?`${origin}`:'/choices')
    }
    if (isLoading) {
        console.log("isLoading")
    }
    if (isError) {
        console.log("isError")
    }
    if (isLoadingError) {
        console.log("isLoadingError")
       
    }
    return (
        <div className='w-full mt-24 flex justify-center '>
            <div className='flex flex-col items-center gap-2 '>
                <Loader2 className='h-8 w-8 animate-spin text-zinc-800 ' />
                <h3 className='font-semibold text-xl '>Setting up you account ...</h3>
                <p>You will be redirected automatically.</p>
            </div>
        </div>
    )
}

export default page