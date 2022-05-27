import { useState } from 'react'

import Wrapper from '../../components/Wrapper'
import Flexbox from './../../components/Flexbox'

import theme from '../../theme'
import {
  StyledEventDescription,
  StyledEventHeading,
  StyledEventIndicator,
  StyledEventStatus,
  StyledEventWrapper,
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
            <EventHeading
              color={StatusEnum[status].headingColor}
              textDecoration={StatusEnum[status].textDecoration}
            >
              AWS Event
            </EventHeading>
            <Flexbox gap="10px">
              <EventDescription color={StatusEnum[status].headingColor}>
                <strong>Time:</strong> 13:00 - 15:00
              </EventDescription>
              <EventDescription color={StatusEnum[status].headingColor}>
                <strong>Location:</strong> Room 404 (FPT University)
              </EventDescription>
            </Flexbox>
          </Flexbox>
          <EventStatus
            textDecoration={StatusEnum[status].textDecoration}
            indicatorColor={StatusEnum[status].indicatorColor}
          >
            {StatusEnum[status].statusString}
          </EventStatus>
        </Flexbox>
      </StyledEventWrapper>
    </Wrapper>
  )
}

const Home = (props) => {
  return (
    <Flexbox flexDirection="column">
      <Event />
      <Event />
    </Flexbox>
  )
}

export default Home
