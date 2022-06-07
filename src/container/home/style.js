import styled from 'styled-components'

import { BaseButton } from '../../components/Button/BaseButton'
import Flexbox from '../../components/Flexbox'
import Wrapper from '../../components/Wrapper'
import Icon from './../../components/Icon'

import { formatDate, useCSS } from '../../utils/helper'
import Profile from './../../asset/image/Security_Consultant.png'
import theme from './../../theme'

const StyledCreateButton = styled(BaseButton)`
  margin-top: 10px;
  justify-content: flex-start;
  gap: 10px;
  padding: 1rem;
  color: ${theme.slate4};
  transition: color 0.25s ease-in-out;
  background-color: ${theme.slate1_10};

  &:hover {
    color: ${theme.low_contrast};
  }
`

export const CreateButton = (props) => {
  const { children, ...rest } = props
  return (
    <StyledCreateButton {...rest}>
      <Flexbox gap="10px">
        <Icon name="add-circle" />
        {children}
      </Flexbox>
    </StyledCreateButton>
  )
}

export const HeaderWrapper = styled(Flexbox)`
  margin-bottom: 40px;
`

const StyledHeaderBrand = styled.div`
  width: ${(props) => props.size || '100'}px;
  height: ${(props) => props.size || '100px'}px;
  border-radius: 5px;
  overflow: hidden;

  & > img {
    width: 100%;
    height: auto;
  }
`

export const HeaderBrand = (props) => {
  return (
    <StyledHeaderBrand {...props}>
      <img src={props.src} />
    </StyledHeaderBrand>
  )
}

const StyledProfileImage = styled.div`
  width: ${(props) => props.size || '100'}px;
  height: ${(props) => props.size || '100'}px;
  overflow: hidden;
  border-radius: 50%;
  flex-shrink: 0;

  & > img {
    width: 100%;
    height: auto;
  }
`

const StyledProfileName = styled.div`
  color: ${theme.high_contrast};
  font-weight: 600;
  font-size: 14px;
`

const StyledProfileRollNumber = styled.div`
  color: ${theme.low_contrast};
  font-weight: 600;
  font-size: 12px;
`

const StyledProfileInformationWrapper = styled(Flexbox)`
  text-align: right;
`

const ProfileImage = (props) => {
  return (
    <StyledProfileImage {...props}>
      <img src={props.src} />
    </StyledProfileImage>
  )
}

export const ProfileInformation = (props) => {
  let { user } = props
  if (!user) {
    user = {
      name: 'N/A',
      rollNumber: 'N/A',
      imageUrl: Profile,
    }
  }

  return (
    <StyledProfileInformationWrapper alignItems="center" gap="10px">
      <Flexbox flexDirection="column" gap="2px">
        <StyledProfileName>Hi, {user.name}</StyledProfileName>
        <StyledProfileRollNumber>{user.rollNumber}</StyledProfileRollNumber>
      </Flexbox>
      <ProfileImage src={user.imageUrl} size={50} />
    </StyledProfileInformationWrapper>
  )
}

export const StyledEventWrapper = styled.div`
  position: relative;
  padding: 15px 15px;
  border-radius: 10px;
  font-size: 10px;

  &:active {
    background-color: ${theme.slate1_10};
  }
`

export const StyledEventIndicator = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  ${(props) => useCSS(props.style)}

  background-color: ${(props) => props.indicatorColor};
`

export const StyledEventHeading = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: ${(props) => props.color || 'inherit'};
  text-decoration: ${(props) => props.textDecoration || ''};
`

export const StyledEventDescription = styled.p`
  font-weight: 500;
  color: ${(props) => props.color || theme.low_contrast};

  & > strong {
    font-weight: 600;
  }
`

export const StyledEventStatus = styled.div`
  color: ${(props) => props.indicatorColor};
  font-size: 10px;
  font-weight: 700;
  text-decoration: ${(props) => props.textDecoration || ''};
`

const StyledHeadingTitle = styled.h1`
  font-size: 20px;
  font-weight: 800;
  color: ${theme.high_contrast};
`

const StyledHeadingDate = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${theme.low_contrast};
`

export const Heading = (props) => {
  const { title, date, dateOptions } = props
  return (
    <Flexbox justifyContent="space-between" alignItems="center">
      <StyledHeadingTitle>{title}</StyledHeadingTitle>
      <StyledHeadingDate>{formatDate(date, dateOptions)}</StyledHeadingDate>
    </Flexbox>
  )
}

export const ContentWrapper = (props) => {
  return (
    <Flexbox flexDirection="column" gap="20px">
      {props.children}
    </Flexbox>
  )
}

export const Content = (props) => {
  return <div>{props.children}</div>
}

export const HomeWrapper = styled(Wrapper)`
  padding: 50px 0;
`
