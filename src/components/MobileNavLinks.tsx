import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react"

const MobileNavLinks = () => {
  const { logout } = useAuth0()

  const handleLogout = () => {
    logout()
    localStorage.clear()
  }

  return (
    <>
      <Link to="/order-status" className="flex bg-white items-center font-bold hover:text-red-500">
        My orders
      </Link>
      <Link
        to="/manage-restaurant"
        className="flex bg-white items-center font-bold hover:text-red-500"
      >
        My Restaurant
      </Link>
      <Link to="/user-profile" className="flex bg-white items-center font-bold hover:text-red-500">
        Edit Profile
      </Link>
      <Button
        onClick={() => handleLogout()}
        className="flex items-center px-3 font-semibold hover:bg-gray-500"
      >
        Log Out
      </Button>
    </>
  )
}

export default MobileNavLinks
