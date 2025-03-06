export interface SignupResponse {
  jwtToken: string,
  jwtExpirationEpochMilli: string,
  loginToken: string,
}

export interface LoginResponse {
  jwtToken: string,
  jwtExpirationEpochMilli: string,
}