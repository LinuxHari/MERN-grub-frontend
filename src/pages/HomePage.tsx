import landingImage from "../assets/AppImage.png"
import appDownloadImage from "../assets/appDownload.png"
import SearchBar, { SearchForm } from "@/components/SearchBar"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const navigate = useNavigate()

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    })
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16 z-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-red-600">
          Indulge in a delivery today
        </h1>
        <span className="text-xl">Your favorite dishes are just a tap away!</span>
        <SearchBar placeHolder="Search by City or Town" onSubmit={handleSearchSubmit} />
      </div>
      <div className="flex flex-col md:flex-row items-center md:justify-around">
        <img
          src={landingImage}
          className="scale-75 w-[80vw] sm:w-[50vw] lg:w-auto"
          loading="lazy"
        />
        <div className="flex flex-col items-center justify-center gap-4 text-center min-w-76 w-full sm:w-4/5 md:max-w-[40vw] md:leading-8">
          <span className="font-bold text-3xl self-start tracking-tighter">
            Your Culinary Companion for Effortless Dining!
          </span>
          <span className="text-justify">
            MERN Grub is where convenience meets culinary excellence! Discover a world of delectable
            delights at your fingertips with our intuitive food ordering{" "}
            <span className="hidden sm:inline">
              {" "}
              From savory snacks to gourmet feasts, we've curated a diverse selection of eateries to
              satisfy every craving.
            </span>
          </span>
          <img src={appDownloadImage} />
        </div>
      </div>
    </div>
  )
}

export default HomePage
