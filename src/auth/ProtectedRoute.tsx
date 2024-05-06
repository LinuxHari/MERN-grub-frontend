import { getUserAccessToken } from "@/utils/getUserInfo"
import { useAuth0 } from "@auth0/auth0-react"
import { useMemo } from "react"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0()
  const userAccessToken = useMemo(() => getUserAccessToken(), [])
  if (isLoading) {
    return null
  }

  if (isAuthenticated || userAccessToken) {
    return <Outlet />
  }

  return <Navigate to="/" replace />
}

export default ProtectedRoute
