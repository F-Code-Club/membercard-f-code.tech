import styled from 'styled-components'

import { Button } from '../../components/Button'
import Divider from '../../components/Divider'
import Wrapper from '../../components/Wrapper'

import FCodeLogo from '../../asset/logo/F-Code.png'
import theme from '../../theme'

// import Avatar from './../../asset/image/Avatar.png'

// export const Button = styled.a``

export const PageWrapper = styled.div``

const StyledLogo = styled.div`
  width: ${(props) => props.size || 50}px;
  height: ${(props) => props.size || 50}px;
  overflow: hidden;
  border-radius: 5px;

  & img {
    width: 100%;
    height: auto;
  }
`

const Logo = (props) => {
  return (
    <StyledLogo size={props.size}>
      <img src={FCodeLogo} alt="F-Code logo" />
    </StyledLogo>
  )
}

const LoginWrapper = styled(Wrapper)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const StyledHeading = styled.h1`
  margin-top: 20px;
  color: ${theme.high_contrast};
  font-size: ${18 / 14}rem;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  & strong {
    font-weight: 900;
  }
`

const LoginHeading = (props) => {
  return <StyledHeading>{props.children}</StyledHeading>
}

const StyledDescription = styled.p`
  margin-top: 10px;
  color: ${theme.low_contrast};
  font-size: 0.75rem;
  font-weight: 500;
`

const LoginDescription = (props) => {
  return <StyledDescription>{props.children}</StyledDescription>
}

const LoginDivider = styled(Divider)`
  margin: 30px 0 20px 0;
`

const LoginButton = styled(Button)`
  font-size: 0.8em;
`

const StyledLoginCredit = styled.a`
  position: absolute;
  bottom: 2rem;
  margin: 0 auto;
  font-size: 0.65em;
  font-weight: 500;

  & > strong {
    font-weight: 700;
  }
`

const LoginCredit = (props) => {
  return <StyledLoginCredit>{props.children}</StyledLoginCredit>
}

export {
  Logo,
  LoginWrapper,
  LoginHeading,
  LoginDescription,
  LoginDivider,
  LoginButton,
  LoginCredit,
}
