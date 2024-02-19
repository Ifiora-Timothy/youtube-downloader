"use client"
import { trpc } from '@/app/_trpc/client'
import { Loader2 } from 'lucide-react'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    console.log('hello');
    
    const { data, isLoading } = trpc.authCallback.useQuery(undefined)
    if (isLoading) {
        console.log(isLoading)
    }
    if (data) {
        console.log(data)
    }
    return (
        <div className='w-full mt-24 flex justify-center '>
            <div className='flex flex-col items-center gap-2 '>
                {/* <Loader2 className='h-8 w-8 animate-spin text-zinc-800 ' /> */}
                <h3 className='font-semibold text-xl '>Setting up you account ...</h3>
                <p>You will be redirected automatically.</p>
            </div>
        </div>
    )
}

export default page