import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

const SkeletonLoading = () => {
  return (
    <div className="w-full h-full">
      <SkeletonTheme>
        <Skeleton className="w-full h-full" />
      </SkeletonTheme>
    </div>
  )
}

export default SkeletonLoading
