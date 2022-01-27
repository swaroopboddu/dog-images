
export interface Breeds {
    [key: string]: string[];
}

interface BreedsResponse{
    breeds: Breeds;
    errorMessage: string;
}

export const getAllBreads = async (): Promise<BreedsResponse> =>{
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    if(response.ok){
        const responseBody = await response.json();
        if(responseBody.status==="success"){
            return {breeds: responseBody.message, errorMessage: "" };
        }else{
            return {breeds: {}, errorMessage: responseBody.message };
        }
    }else{
        const error = await response.text();
        return {breeds:{}, errorMessage: error};
    }
}

interface dogImagesResponse{
    images: string[];
    errorMessage: string;
}

export const getDogImages = async (breed: string,subBread: string|null = null): Promise<dogImagesResponse> =>{
    subBread = subBread?`/${subBread}`:"";
    const url = `https://dog.ceo/api/breed/${breed}${subBread}/images/random/6  `
    const response = await fetch(url);
    if(response.ok){
        const responseBody = await response.json();
        if(responseBody.status==="success"){
            return {images: responseBody.message, errorMessage: "" };
        }else{
            return {images: [], errorMessage: responseBody.message };
        }
    }else{
        const error = await response.text();
        return {images:[], errorMessage: error};
    }
}