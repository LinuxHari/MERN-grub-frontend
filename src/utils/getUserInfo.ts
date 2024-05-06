const getUserEmail = () => {
  return localStorage.getItem("email")
}

const getUserAccessToken = () => {
  return localStorage.getItem("accessToken")
}

export { getUserEmail, getUserAccessToken }
