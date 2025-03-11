export const useAuthentication = async () => {
  const localStorageLoginRefreshToken = "loginToken"
  const localStorageJwtToken = "jwtToken"
  const localStorageJwtExpiration = "jwtExpirationEpochMilli"
  
  const authenticationApi = new AuthenticationApi();

  if (localStorage.getItem(localStorageLoginRefreshToken) == null) {
    const content = await authenticationApi.signup()
    localStorage.setItem(localStorageLoginRefreshToken, content.loginToken)
    localStorage.setItem(localStorageJwtToken, content.jwtToken)
    localStorage.setItem(localStorageJwtExpiration, content.jwtExpirationEpochMilli)
  }

  const jwtExpirationEpochMilli = parseInt(localStorage.getItem(localStorageJwtExpiration)!!)

  const now = new Date()
  now.setHours(now.getHours() - 3);
  const threeHoursAgo = now.getTime()

  if (jwtExpirationEpochMilli < threeHoursAgo) {
    const loginToken = localStorage.getItem(localStorageLoginRefreshToken)!!
    const freshAuthInfo = await authenticationApi.login(loginToken)

    localStorage.setItem(localStorageJwtToken, freshAuthInfo.jwtToken)
    localStorage.setItem(localStorageJwtExpiration, freshAuthInfo.jwtExpirationEpochMilli)
  }
  
  return { jwtToken: localStorage.getItem(localStorageJwtToken) }
}