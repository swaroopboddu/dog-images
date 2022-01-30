import { useCallback, useEffect } from "react";
import { useState } from "react";
import { getDogImages } from "./fetchdata";

export const useDogImagesAPI: (
  breed: string,
  subBreed: string
) => [string[], string, boolean, ()=>void] = (breed, subBreed) => {
  const [imagesSrc, setImagesSrc] = useState<string[]>([]);
  const [apiError, setApiError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(()=>false);

  const loadMoreImages = useCallback((isNewList = false) => {
    if (breed && breed.length > 0) {
      setIsLoading(true);
      getDogImages(breed, subBreed).then((val) => {
        if (val.errorMessage?.length > 0) {
          setApiError(val.errorMessage);
          setImagesSrc(val.images);
        } else {
          if(isNewList){
            setImagesSrc(val.images);  
          }else{
            setImagesSrc((prev) => [...prev, ...val.images]);
          }
          setApiError("");
        }
        setIsLoading(false);
      });
    }
  }, [breed, subBreed, setImagesSrc, setApiError,setIsLoading]);
  
  
  
  useEffect(() => {
    loadMoreImages(true);
  }, [loadMoreImages]);

 

  return [imagesSrc, apiError, isLoading ,loadMoreImages];
};
