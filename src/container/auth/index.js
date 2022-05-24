import { useLocation, Navigate } from 'react-router-dom'

import Icon from '../../components/Icon'

import LocalStorageUtils from './../../utils/LocalStorageUtils'
import {
  Logo,
  LoginWrapper,
  LoginHeading,
  LoginDescription,
  LoginDivider,
  LoginButton,
  LoginCredit,
} from './style'

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
    // <div>
    //   <LoginButton href={ApiUrl + 'google'}>Sign in</LoginButton>
    // </div>
    <LoginWrapper minHeight="100vh">
      <Logo size={60} />
      <LoginHeading>
        Welcome to <strong>F-Code.</strong>
      </LoginHeading>
      <LoginDescription>A simple platform for event management.</LoginDescription>
      <LoginDivider width={120} />
      <LoginButton href={ApiUrl + 'google'}>
        Sign in with Google account{' '}
        <Icon
          name="arrow-forward"
          style={{
            'margin-left': '5px',
            transform: 'translateY(0.5px)',
          }}
        />
      </LoginButton>
      <LoginCredit>
        Designed by <strong>F-Code Team.</strong>
      </LoginCredit>
    </LoginWrapper>
  )
}

export default Auth
