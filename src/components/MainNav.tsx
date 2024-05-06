import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "./ui/button"
import UsernameMenu from "./UsernameMenu"
import { Link } from "react-router-dom"
import { useMemo } from "react"
import { getUserEmail } from "@/utils/getUserInfo"

const MainNav = () => {
  const { loginWithRedirect, user } = useAuth0()
  const userEmail = useMemo(() => {
    return user?.email || getUserEmail()
  }, [user])
  return (
    <span className="flex gap-x-4 justify-around items-center">
      {userEmail ? (
        <>
          <Link to="/order-status" className="font-bold hover:text-red-500">
            My orders
          </Link>
          <Link to="/manage-restaurant" className="font-bold hover:text-red-500">
            My Restaurant
          </Link>
          <UsernameMenu email={userEmail} />
        </>
      ) : (
        <Button
          variant="ghost"
          className="font-bold hover:text-red-500 hover:bg-white"
          onClick={async () => await loginWithRedirect()}
        >
          Log In
        </Button>
      )}
    </span>
  )
}

export default MainNav
