import { useSearchRestaurants } from "@/api/RestaurantApi"
import CuisineFilter from "@/components/CuisineFilter"
import Loading from "@/components/Loading"
import PaginationSelector from "@/components/PaginationSelector"
import SearchBar, { SearchForm } from "@/components/SearchBar"
import SearchResultsCard from "@/components/SearchResultsCard"
import SearchResultsInfo from "@/components/SearchResultsInfo"
import SortOptionDropdown from "@/components/SortOptionDropdown"
import { useState } from "react"
import { useParams } from "react-router-dom"

export type SearchState = {
  searchQuery: string
  page: number
  selectedCuisines: string[]
  sortOption: string
}

const SearchPage = () => {
  const { city } = useParams()
  const [SearchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  })

  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const { results, isLoading } = useSearchRestaurants(SearchState, city)

  const setSortOption = (sortOption: string) =>
    setSearchState((prevState) => ({ ...prevState, sortOption, page: 1 }))

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
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-x-10">
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
        {isLoading ? (
          <Loading />
        ) : !results?.data || !city ? (
          <span className="font-bold text-xl md:text-2xl flex items-center justify-center">
            No restaurants found
          </span>
        ) : (
          <>
            <div className="flex justify-between flex-col gap-3 lg:flex-row">
              <SearchResultsInfo total={results.pagination.total} city={city} />
              <SortOptionDropdown
                sortOption={SearchState.sortOption}
                onChange={(value) => setSortOption(value)}
              />
            </div>
            {results.data.map((restaurant) => (
              <SearchResultsCard key={restaurant._id} restaurant={restaurant} />
            ))}
            {results.data.length > 0 && (
              <PaginationSelector
                page={results.pagination.page}
                pages={results.pagination.pages}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default SearchPage
