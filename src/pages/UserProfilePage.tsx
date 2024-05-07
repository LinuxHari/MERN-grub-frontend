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
    return (
      <p className="text-center font-semibold p-3 text-2xl md:text-3xl">
        Unable to load user profile
      </p>
    )
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
