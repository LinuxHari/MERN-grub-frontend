import { CircleUserRound } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useAuth0 } from "@auth0/auth0-react"
import { DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { Link } from "react-router-dom"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"

type Props = {
  email: string
}

const UsernameMenu = ({ email }: Props) => {
  const { logout } = useAuth0()

  const handleLogout = () => {
    logout()
    localStorage.clear()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center font-bold hover:text-red-500 gap-2">
        <CircleUserRound className="text-red-500" />
        {email}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white space-y-2 rounded-md mt-2 shadow-lg p-1 w-60">
        {/* <DropdownMenuItem>
          <Link to="/manage-restaurant" className="font-bold hover:text-red-500 px-8">
            Manage Restaurant
          </Link>
        </DropdownMenuItem> */}
        <DropdownMenuItem>
          <Link to="/user-profile" className="font-bold hover:text-red-500 px-8">
            User Profile
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button
            onClick={() => handleLogout()}
            className="flex flex-1 font-bold bg-red-500 w-full"
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UsernameMenu
