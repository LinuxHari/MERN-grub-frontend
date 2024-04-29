import { useSearchRestaurants } from "@/api/RestaurantApi"
import CuisineFilter from "@/components/CuisineFilter"
import PaginationSelector from "@/components/PaginationSelector"
import SearchBar, { SearchForm } from "@/components/SearchBar"
import SearchResultsCard from "@/components/SearchResultsCard"
import SearchResultsInfo from "@/components/SearchResultsInfo"
import SortOptionDropdown from "@/components/SortOptionDropdown"
import { useState } from "react"
import { useParams } from "react-router-dom"

export type SearchState = {
  searchQuery: string
  page: Number
  selectedCuisines: string[]
  sortOption: string
}

const SearchPage = () => {
  const { city } = useParams()
  const [SearchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch"
  })

  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const { results, isLoading } = useSearchRestaurants(SearchState, city)

  const setSortOption = (sortOption: string) => (
    setSearchState((prevState) => (
      {...prevState,
        sortOption,
        page: 1
      }
    ))
  )

  if (isLoading) {
    return <span>Loading ...</span>
  }

  if (!results?.data || !city) {
    return <span>No results found</span>
  }

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }))
  }

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }))
  }

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }))
  }

  const setSelectedCuisine = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr]">
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={SearchState.selectedCuisines}
          onChange={setSelectedCuisine}
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded((prevIsExtended) => !prevIsExtended)}
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={SearchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by Cuisine or Restaurant Name"
          onReset={resetSearch}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
        <SearchResultsInfo total={results.pagination.total} city={city} />
        <SortOptionDropdown sortOption={SearchState.sortOption} onChange={(value) => setSortOption(value)}/>
        </div>
        {results.data.map((restaurant) => (
          <SearchResultsCard restaurant={restaurant} />
        ))} 
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}

export default SearchPage
