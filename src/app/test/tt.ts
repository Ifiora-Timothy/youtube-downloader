const arr=[
    {
        name:"one",
        bitrate:1,
        qualityLabel:"1080p" 
    },
    {
        name:"two",
        bitrate:2,
        qualityLabel:"320p" 
    },
    {
        name:"three",
        bitrate:2,
        qualityLabel:"1080p" 
    }, {
        name:"three",
        bitrate:3,
        qualityLabel:"480p" 
    }, {
        name:"three",
        bitrate:7,
        qualityLabel:"480p" 
    },
    {
        name:"four",
        bitrate:1,
        qualityLabel:"320p" 
    },  
    {
        name:"four",
        bitrate:10,
    }
]

//sort the above array to return an array that contains the unique quality and the highest value of the quality

const uniqueQuality = arr.reduce<{[key:string]:any}>((acc,curr)=>{
    if(curr.qualityLabel){
        if(!acc[curr.qualityLabel]){
            acc[curr.qualityLabel]=curr
        }else{
            if(acc[curr.qualityLabel].bitrate<curr.bitrate){
                acc[curr.qualityLabel]=curr
            }
        }
    }
    return acc
},{})

console.log(Object.values(uniqueQuality).map(({ name, qualityLabel }) => ({ name, qualityLabel })));

