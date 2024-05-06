import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet"
import { CircleUserRound, Menu } from "lucide-react"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react"
import MobileNavLinks from "./MobileNavLinks"
import { useMemo } from "react"
import { getUserEmail } from "@/utils/getUserInfo"

const MobileNav = () => {
  const { loginWithRedirect, user } = useAuth0()
  const userEmail = useMemo(() => {
    return user?.email || getUserEmail()
  }, [user])

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-red-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3 w-80 sm:w-auto">
        <SheetTitle className="mt-7">
          {userEmail ? (
            <span className="flex items-center text-base sm:text-lg font-bold gap-2">
              <CircleUserRound className="text-red-500" />
              {userEmail}
            </span>
          ) : (
            <span>Welcome to MernGrub!</span>
          )}
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-4">
          {userEmail ? (
            <MobileNavLinks />
          ) : (
            <Button onClick={() => loginWithRedirect()} className="flex-1 font-bold border-red-500">
              Log In
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav
