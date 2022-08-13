const publicRuntimeConfig = {
  NODE_ENV: process.env.NODE_ENV || 'production',
  API_URL: process.env.REACT_APP_API_URL,
  LOCALSTORAGE_TOKEN_NAME: 'token',
  LOCALSTORAGE_USER_NAME: 'user',
  LOCALSTORAGE_JWT_USER_NAME: 'jwt_user',
}

export const {
  NODE_ENV,
  API_URL,
  LOCALSTORAGE_TOKEN_NAME,
  LOCALSTORAGE_USER_NAME,
  LOCALSTORAGE_JWT_USER_NAME,
} = publicRuntimeConfig

export default publicRuntimeConfig.NODE_ENV
