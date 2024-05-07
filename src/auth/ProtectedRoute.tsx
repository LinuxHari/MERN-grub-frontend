import { getUserAccessToken } from "@/utils/getUserInfo"
import { useAuth0 } from "@auth0/auth0-react"
import { ReactNode, useMemo } from "react"
import { Navigate } from "react-router-dom"

type Props = {
  children: ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated, isLoading } = useAuth0()
  const userAccessToken = useMemo(() => getUserAccessToken(), [])
  if (isLoading) {
    return null
  }

  if (isAuthenticated || userAccessToken) {
    return children
  }

  return <Navigate to="/" replace />
}

export default ProtectedRoute
