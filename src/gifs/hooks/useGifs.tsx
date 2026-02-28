import { useRef, useState } from "react";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";
import type { Gif } from "../interfaces/gif.interface";

// Outside the custom hook to avoid re render
// const gifsCache: Record<string, Gif[]> = { };

export const useGifs = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  const gifsCache = useRef<Record<string, Gif[]>>({});


  const handleTermClicked = async(term: string) => {
    if (gifsCache.current[term]) {
      setGifs(gifsCache.current[term]);
      return;
    }
    const gifs = await getGifsByQuery(term);
    setGifs(gifs);
  };

  const handleSearch = async(query: string) => {
    const clearQuery = query.toLowerCase().trim();
    if (clearQuery === '') return;
    if (previousTerms.includes(clearQuery)) return;

    const newTerms = [clearQuery, ...previousTerms].slice(0, 8);
    setPreviousTerms(newTerms);

    const gifs = await getGifsByQuery(clearQuery);
    setGifs(gifs);

    gifsCache.current[query] = gifs;
    console.log(gifsCache);
  };

  return {
    // Values
    previousTerms,
    gifs,
    // Methods
    handleTermClicked,
    handleSearch

  }
}
