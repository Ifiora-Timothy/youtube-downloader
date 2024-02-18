import React from 'react'
import { trpc } from '../_trpc/client'

type Props = {}

const Test = async(props: Props) => {
    const {data,isLoading} = trpc.test.useQuery()

  return (
    <div>
      Test
    </div>
  )
}

export default Test