import { useState } from 'react'

import Divider from './../../components/Divider'
import Flexbox from './../../components/Flexbox'
import Wrapper from './../../components/Wrapper'

import Avatar from './../../asset/image/Avatar.png'
import theme from './../../theme'
import {
  HeaderBrand,
  StyledEventDescription,
  StyledEventHeading,
  StyledEventIndicator,
  StyledEventStatus,
  StyledEventWrapper,
  HeaderWrapper,
  ProfileInformation,
  Heading,
  CreateButton,
} from './style'

const StatusEnum = {
  ongoing: {
    indicatorColor: theme.teal,
    statusString: 'On-going',
  },
  cancel: {
    indicatorColor: theme.red1,
    statusString: 'Canceled',
  },
  ended: {
    headingColor: theme.slate4,
    indicatorColor: theme.slate4,
    textDecoration: 'line-through',
    statusString: 'Ended',
  },
}

const ComponentWrapper = (Component, props) => {
  const { children, ...rest } = props
  return <Component {...rest}>{children}</Component>
}

const EventHeading = (props) => ComponentWrapper(StyledEventHeading, props)
const EventDescription = (props) => ComponentWrapper(StyledEventDescription, props)
const EventStatus = (props) => ComponentWrapper(StyledEventStatus, props)

const Event = (props) => {
  const [status, setStatus] = useState('ongoing')

  return (
    <Wrapper>
      <StyledEventWrapper>
        <Flexbox gap="5px">
          <StyledEventIndicator
            indicatorColor={StatusEnum[status].indicatorColor}
            style={{ transform: 'translateY(4px)' }}
          ></StyledEventIndicator>
          <Flexbox flexDirection="column" gap="5px">
            <Flexbox justifyContent="space-between">
              <EventHeading
                color={StatusEnum[status].headingColor}
                textDecoration={StatusEnum[status].textDecoration}
              >
                AWS Event
              </EventHeading>
              <EventStatus
                textDecoration={StatusEnum[status].textDecoration}
                indicatorColor={StatusEnum[status].indicatorColor}
              >
                {StatusEnum[status].statusString}
              </EventStatus>
            </Flexbox>
            <Flexbox gap="10px">
              <EventDescription color={StatusEnum[status].headingColor}>
                <strong>Time:</strong> 13:00 - 15:00
              </EventDescription>
              <EventDescription color={StatusEnum[status].headingColor}>
                <strong>Location:</strong> Room 404 (FPT University)
              </EventDescription>
            </Flexbox>
          </Flexbox>
        </Flexbox>
      </StyledEventWrapper>
    </Wrapper>
  )
}

const Home = (props) => {
  return (
    <Wrapper>
      <HeaderWrapper justifyContent="space-between">
        <HeaderBrand src={Avatar} size={50} />
        <ProfileInformation name="Ly Tuan Kiet" rollNumber="SE160049" />
      </HeaderWrapper>
      <Heading title="Today" date={new Date()} />
      <CreateButton>Create new event</CreateButton>
      <Divider />
      <Flexbox flexDirection="column">
        <Event />
        <Event />
      </Flexbox>
    </Wrapper>
  )
}

export default Home
