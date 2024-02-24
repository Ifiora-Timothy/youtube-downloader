import React from 'react'
import HorizontalListCard from '../UI/HorizontalListCard'
import VerticalListCard from '../UI/VerticalListCard'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import List from './List'
type Props = {}

const Downloads = (props: Props) => {
  return (
    <Card className='bg-transparent shadow-none border-none '>
      <CardHeader>
        <CardTitle>Download Details...</CardTitle>
      </CardHeader>
      <CardContent className="self-stretch justify-center h-max items-start gap-6 flex">
        <List type='playlist'/>
        <VerticalListCard />
      </CardContent>

    </Card>
  )
}

export default Downloads