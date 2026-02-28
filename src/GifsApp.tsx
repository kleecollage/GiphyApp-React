import { GifList } from "./gifs/components/GifList"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
// import { mockGifs } from "./mock-data/gifst.mock"
import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from "./shared/components/SearchBar"
import { useGifs } from "./gifs/hooks/useGifs"

export const GifsApp = () => {
  const {previousTerms, gifs, handleSearch, handleTermClicked} = useGifs();

  return (
    <>
      {/* HEADER */}
      <CustomHeader title="Gifs Searcher" description="Discover and share the perfect GIF" />
      {/* SEARCHBAR */}
      <SearchBar placeholder="Search what you want" onQuery={handleSearch} />
      {/* PREVIOUS SEARCHES */}
      <PreviousSearches searches={previousTerms} onLabelClicked={handleTermClicked}/>
      {/* GIFS */}
      <GifList gifs={gifs} />
    </>
  )
}
