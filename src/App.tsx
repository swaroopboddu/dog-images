import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { BreedSelect } from "./components/BreedSelect";
import { useDogBreads } from "./dogapis/useDogBreads";
import { useDogImagesAPI } from "./dogapis/useDogImagesAPI";

function App() {
  const [breed, setBreed] = useState("");
  const [subBreed, setSubBreed] = useState("");
  const afterLoadingBreeds = useCallback(
    (value: string) => {
      setBreed(value);
      setSubBreed("");
    },
    [setBreed, setSubBreed]
  );
  const [breeds, errorMessage, listOfBreeds] = useDogBreads(afterLoadingBreeds);
  const [imageSrcs, errorMessageFromImages, isLoading, loadMoreImages] =
    useDogImagesAPI(breed, subBreed);

  const mainBreedCallback = useCallback(
    (value: string) => {
      setBreed(value);
      setSubBreed("");
    },
    [setBreed, setSubBreed]
  );

  const subBreedCallback = useCallback(
    (value: string) => {
      setSubBreed(value);
    },
    [setSubBreed]
  );
  
  const onScroll = useCallback(
    (e: Event) => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (!isLoading && scrollTop + clientHeight >= scrollHeight - 5) {
        loadMoreImages();
      }
    },
    [loadMoreImages,isLoading]
  );

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);


  if (errorMessage?.length > 0) {
    return <div>{errorMessage}</div>;
  }

  
  return errorMessageFromImages?.length > 0 ? (
    <div>{errorMessageFromImages}</div>
  ) : (
    <div className="App">
      <div className="selection-container">
        <BreedSelect
          breeds={listOfBreeds}
          onSelectCallback={mainBreedCallback}
          selectLabel="Breed"
          disabled={isLoading}
        />

        <BreedSelect
          breeds={breeds[breed]}
          onSelectCallback={subBreedCallback}
          selectLabel="Sub-Breed"
          disabled={isLoading}
        />
      </div>
      <div className="image-container">
        {imageSrcs && imageSrcs.length > 0
          ? imageSrcs.map((value, index) => (
              <div className="image-item" key={index}>
                <img src={value} alt="" key={index} />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default App;
