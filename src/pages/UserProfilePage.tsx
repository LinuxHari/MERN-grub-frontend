import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi"
import Loading from "@/components/Loading"
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm"

const UserProfilePage = () => {
  const { currentUser, isLoading: isGetLoading } = useGetMyUser()
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser()

  if (isGetLoading) {
    return <Loading />
  }

  if (!currentUser) {
    return <span>Unable to load user profile</span>
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
      buttonText="Update"
    />
  )
}

export default UserProfilePage
