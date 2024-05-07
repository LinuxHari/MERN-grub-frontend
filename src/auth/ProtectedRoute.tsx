import { getUserAccessToken } from "@/utils/getUserInfo"
import { useAuth0 } from "@auth0/auth0-react"
import { useMemo } from "react"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth0()
  const userAccessToken = useMemo(() => getUserAccessToken(), [])

  if (isAuthenticated || userAccessToken) {
    return <Outlet />
  }

  return <Navigate to="/" replace />
}

export default ProtectedRoute
