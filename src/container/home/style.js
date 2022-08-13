import { useState } from 'react'

import Buffer from 'buffer/'
import styled from 'styled-components'

import { BaseButton } from '../../components/Button/BaseButton'
import Flexbox from '../../components/Flexbox'
import Wrapper from '../../components/Wrapper'
import Icon from './../../components/Icon'

import { leadingZero, WEEKDAYS_SHORT, MONTHS_SHORT, formatDate, useCSS } from '../../utils/helper'
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
  const { children, onClick, ...rest } = props

  return (
    <StyledCreateButton {...rest} onClick={onClick}>
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

const StyledProfileMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  transform: translateY(20%);
  display: ${(props) => (props.isHidden ? 'none' : 'block')};
  padding: 0.25rem 0.5rem;
  background-color: blue;
  border-radius: 0.5rem;

  background: rgba(255, 255, 255, 1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);

  ${
    '' /* border-radius: 0.5rem;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px); */
  }

  & > a {
    background-color: transparent;
    font-weight: 700;
    padding: 1rem 2rem;
  }
`

export const ProfileInformation = (props) => {
  let { user } = props
  if (!user) {
    user = {
      name: 'N/A',
      rollNumber: 'N/A',
      imageUrl: Profile,
    }
  }

  const [isMenuHidden, setIsMenuHidden] = useState(true)

  const convertAvatar = (avatar) => {
    let buffer = Buffer.Buffer
    let result = buffer.from(avatar).toString('base64')
    return `data:image/png;base64,${result}`
  }

  return (
    <StyledProfileInformationWrapper alignItems="center" gap="10px" position="relative">
      <Flexbox flexDirection="column" gap="2px">
        <StyledProfileName>Hi, {`${user.first_name} ${user.last_name}`}</StyledProfileName>
        <StyledProfileRollNumber>{user.member_id}</StyledProfileRollNumber>
      </Flexbox>
      <ProfileImage
        src={convertAvatar(user?.avartar?.data)}
        size={50}
        onClick={() => setIsMenuHidden((prev) => !prev)}
      />
      <StyledProfileMenu isHidden={isMenuHidden}>
        <BaseButton>Log out</BaseButton>
      </StyledProfileMenu>
    </StyledProfileInformationWrapper>
  )
}

export const StyledEventWrapper = styled.div`
  position: relative;
  padding: 15px 15px;
  border-radius: 10px;
  font-size: 10px;
  cursor: pointer;
  transition-duration: 0.4s;
  &:active,
  :hover {
    background-color: ${theme.slate1_10};
  }
`

export const StyledEventIndicator = styled.div`
  width: ${(props) => (props.size ? props.size + 'px' : '6px')};
  height: ${(props) => (props.size ? props.size + 'px' : '6px')};
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
const StyledParagraph = styled.p`
  color: ${theme.low_contrast};
  font-size: 12px;
  font-weight: 500;
`
const StyledParagraphWrapper = styled(Flexbox)`
  padding: 0 10px;
`
const StyledCheckmarkWrapper = styled.div`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 999rem;
  flex-shrink: 0;
`
const CheckmarkIcon = (props) => {
  const { size } = props
  return (
    <StyledCheckmarkWrapper color={theme.cyan2} size={size + size}>
      <Icon name="checkmark" weight={6} size={size + 2} style={{ color: theme.cyan1 }} />
    </StyledCheckmarkWrapper>
  )
}
export const ConfirmationParagraph = (props) => {
  const { startDate, endDate } = props
  return (
    <StyledParagraphWrapper gap={10} alignItems="center">
      <CheckmarkIcon size={10} />
      <StyledParagraph>
        {startDate.getDate() === endDate.getDate() &&
        startDate.getMonth() === endDate.getMonth() &&
        startDate.getFullYear() === endDate.getFullYear()
          ? `This event will take place at ${WEEKDAYS_SHORT[startDate.getDay()]}, ${
              MONTHS_SHORT[startDate.getMonth()]
            } ${startDate.getDate()} ${startDate.getFullYear()} from ${leadingZero(
              startDate.getHours()
            )}:${leadingZero(startDate.getMinutes())} to ${leadingZero(
              endDate.getHours()
            )}:${leadingZero(endDate.getMinutes())}`
          : `This event will take place from ${WEEKDAYS_SHORT[startDate.getDay()]}, ${
              MONTHS_SHORT[startDate.getMonth()]
            } ${startDate.getDate()} ${startDate.getFullYear()} ${leadingZero(
              startDate.getHours()
            )}:${leadingZero(startDate.getMinutes())} to ${WEEKDAYS_SHORT[endDate.getDay()]}, ${
              MONTHS_SHORT[endDate.getMonth()]
            } ${endDate.getDate()} ${endDate.getFullYear()} ${leadingZero(
              endDate.getHours()
            )}:${leadingZero(endDate.getMinutes())}`}
      </StyledParagraph>
    </StyledParagraphWrapper>
  )
}
