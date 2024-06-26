import { AppState, Auth0Provider } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"

type Auth0ProviderWithNavigateProps = {
  children: React.ReactNode
}

const Auth0ProviderWithNavigate = ({ children }: Auth0ProviderWithNavigateProps) => {
  const navigate = useNavigate()
  const domain = import.meta.env.VITE_AUTH0_DOMAIN
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
  const redicrectUri = window.origin
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE

  if (!domain || !clientId || !audience) {
    throw new Error("Unable to initialise auth")
  }

  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || "/auth-callback")
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redicrectUri, audience }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}

export default Auth0ProviderWithNavigate
