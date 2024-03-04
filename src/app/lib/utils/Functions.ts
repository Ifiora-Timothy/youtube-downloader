import { vidFormat } from "@/app/contextProviders/data";
import { vidRequired } from "../yt/ytdlUtils";

//function to compare the two objects so that in case of nested objects it can compare them as well as well as the arrangement of the keys
export function compareObjects(obj1:vidRequired, obj2:vidRequired) {
    console.log("here4",obj1,obj2);
    
    //if the any of the objects is null or undefined then return false
if (!obj1||!obj2) {
    console.log("here3");
    
        return false;
    }
console.log("here5");

if(obj1.videoId!==obj2.videoId){
    return false
}
else{
    return true
}
 
 
}

export function includesObj({array,object}:{array:vidFormat[],object:vidRequired}){
    console.log("here1");
    
    if(array.length===0){
        console.log("here");
        
        return false

    }
    console.log("here2");
    
    return  array.some((item)=>compareObjects(item.videoDetails,object));
}
