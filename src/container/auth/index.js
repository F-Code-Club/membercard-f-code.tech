import { useLocation, Navigate } from 'react-router-dom'

import LocalStorageUtils from './../../utils/LocalStorageUtils'
import { Button } from './style'

const Auth = () => {
  const ApiUrl = process.env.REACT_APP_API_URL + '/api/auth/'
  // get token from the url after successful signed in
  let location = useLocation()
  const UrlParams = new URLSearchParams(location.search)
  if (UrlParams.get('success') === 'true') {
    // save token to localStorage
    let response = {
      success: UrlParams.get('success'),
      token: UrlParams.get('token'),
    }
    LocalStorageUtils.setItem('token', response.token)
    return <Navigate to="/" replace />
  }
  return (
    <div>
      <Button href={ApiUrl + 'google'}>Sign in</Button>
    </div>
  )
}

export default Auth
