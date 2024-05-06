import { cuisineList } from "@/config/restaurant-options-config"
import { Label } from "./ui/label"
import { ChangeEvent } from "react"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "./ui/button"

type Props = {
  onChange: (cuisines: string[]) => void
  selectedCuisines: string[]
  isExpanded: boolean
  onExpandedClick: () => void
}

const CuisineFilter = ({ onChange, selectedCuisines, isExpanded, onExpandedClick }: Props) => {
  const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = event.target.value
    const isChecked = event.target.checked

    const newCuisinesList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine)

    onChange(newCuisinesList)
  }
  const handleCuisinesReset = () => onChange([])

  return (
    <>
      <div className="flex justify-between items-center px-2">
        <p className="text-md font-semibold mb-2">Filter By Cuisine</p>
        <p
          onClick={handleCuisinesReset}
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
        >
          Reset Filters
        </p>
      </div>
      <div
        className={`space-y-2 flex flex-col transition-all duration-700 ${isExpanded ? "h-auto" : "h-fit"}`}
      >
        {cuisineList.slice(0, isExpanded ? cuisineList.length : 7).map((cuisine) => {
          const isSelected = selectedCuisines.includes(cuisine)
          return (
            <div className="flex" key={cuisine}>
              <input
                type="checkbox"
                id={`cuisine_${cuisine}`}
                className="hidden"
                value={cuisine}
                checked={isSelected}
                onChange={handleCuisinesChange}
              />
              <Label
                htmlFor={`cuisine_${cuisine}`}
                className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${isSelected ? "border border-green-600 text-green-600" : "border border-slate-300"}`}
              >
                {isSelected && <Check size={20} strokeWidth={3} />}
                {cuisine}
              </Label>
            </div>
          )
        })}
        <Button onClick={onExpandedClick} variant="link" className="mt-4 flex-1">
          {isExpanded ? (
            <span className="flex flex-row items-center">
              View Less
              <ChevronUp />
            </span>
          ) : (
            <span className="flex flex-row items-center">
              View More <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  )
}

export default CuisineFilter