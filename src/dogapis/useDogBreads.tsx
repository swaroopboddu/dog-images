import  { useEffect, useState } from "react";
import { Breeds, getAllBreads } from "./fetchdata";

export const useDogBreads = (afterLoadingBreeds: (value: string) => void):[Breeds, string, string[]]=>{
    const [breeds, setBreeds] = useState<Breeds>({});
    const [apiError, setAPIError] = useState<string>("");
    useEffect(()=>{
        getAllBreads().then(response =>{
            if(!response.errorMessage || response.errorMessage.length===0){
               setBreeds(response.breeds); 
               for (const property in response.breeds) {
                 afterLoadingBreeds(property);
                 break;
               }
               setAPIError(""); 
            }else{
                setBreeds({});
                setAPIError(response.errorMessage);
            }
        })
    },[setBreeds, setAPIError,afterLoadingBreeds]);
    return [breeds, apiError, Object.keys(breeds)];
}