import React, { useEffect, useState } from "react";
import { getDogImages } from "./fetchdata";


export const useDogImagesAPI:((breed:string, subBreed: string)=>([string[], string])) = (breed,subBreed) =>{
    const [imagesSrc, setImagesSrc] = useState<string[]>([]);
    const [apiError, setApiError] = useState<string>("");
    
    useEffect(()=>{
        if(breed && breed.length>0){
            getDogImages(breed,subBreed).then((val)=>{
                if(val.errorMessage?.length>0){
                    setApiError(val.errorMessage);
                    setImagesSrc(val.images);
                }else{
                    setImagesSrc(val.images);
                    setApiError("");
                }
            });
        }
    },[breed, subBreed, setImagesSrc,setApiError])

    return [imagesSrc, apiError]

}