"use server"

import { format } from "../UI/HorizontalListCard"


export const getFormatUrl=({qualityLabel,formats}:{qualityLabel:string,formats:format[]}):string=>{
    "use server"
    const format=formats.find((item)=>item.qualityLabel===qualityLabel)
    console.log(format?.url);
    
    return format?.url||''
    }