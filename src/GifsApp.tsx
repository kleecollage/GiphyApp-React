import { useState } from "react"
import { GifList } from "./gifs/components/GifList"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
// import { mockGifs } from "./mock-data/gifst.mock"
import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from "./shared/components/SearchBar"
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action"
import type { Gif } from "./gifs/interfaces/gif.interface"

export const GifsApp = () => {
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  const [gifs, setGifs] = useState<Gif[]>([]);

  const handleTermClicked = async(term: string) => {
    const gifsResponse = await getGifsByQuery(term);
    setGifs(gifsResponse);
  };

  const handleSearch = async(query: string) => {
    const clearQuery = query.toLowerCase().trim();
    if (clearQuery === '') return;
    if (previousTerms.includes(clearQuery)) return;

    const newTerms = [clearQuery, ...previousTerms].slice(0, 8);
    setPreviousTerms(newTerms)

    const gifs = await getGifsByQuery(clearQuery);
    setGifs(gifs)
  };


  return (
    <>
      {/* HEADER */}
      <CustomHeader title="Gifs Searcher" description="Discover and share the perfect GIF" />
      {/* SEARCHBAR */}
      <SearchBar placeholder="Search what you want" onQuery = {handleSearch} />
      {/* PREVIOUS SEARCHES */}
      <PreviousSearches searches={previousTerms} onLabelClicked={handleTermClicked}/>
      {/* GIFS */}
      <GifList gifs={gifs} />
    </>
  )
}
