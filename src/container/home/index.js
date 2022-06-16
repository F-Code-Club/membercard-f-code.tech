import { useState, useEffect } from 'react'

import { Navigate } from 'react-router-dom'

import Divider from './../../components/Divider'
import Flexbox from './../../components/Flexbox'
import Wrapper from './../../components/Wrapper'

import LocalStorageUtils from '../../utils/LocalStorageUtils'
import { formatUpcomingTime, leadingZero } from '../../utils/helper'
import Avatar from './../../asset/image/Avatar.png'
import theme from './../../theme'
import productApi from './../../utils/productApi'
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
  ContentWrapper,
  Content,
  HomeWrapper,
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
  end: {
    headingColor: theme.slate4,
    indicatorColor: theme.slate4,
    textDecoration: 'line-through',
    statusString: 'Ended',
  },
  upcoming: {
    headingColor: theme.low_contrast,
    indicatorColor: theme.slate4,
    statusString: 'Up-coming',
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
  let { event } = props
  if (!event) {
    const { name, place, start, end, status } = event
    event = { name, place, start, end, status }
  }

  const [current] = useState({
    name: event.name,
    place: event.place,
    start: event.start,
    end: event.end,
    status: event.status ? event.status : 'ongoing',
  })

  return (
    <Wrapper>
      <StyledEventWrapper>
        <Flexbox gap="5px">
          <StyledEventIndicator
            indicatorColor={StatusEnum[current.status].indicatorColor}
            style={{ transform: 'translateY(4px)' }}
          ></StyledEventIndicator>
          <Flexbox flexDirection="column" gap="5px">
            <Flexbox justifyContent="space-between">
              <EventHeading
                color={StatusEnum[current.status].headingColor}
                textDecoration={StatusEnum[current.status].textDecoration}
              >
                {current.name}
              </EventHeading>
              <EventStatus
                textDecoration={StatusEnum[current.status].textDecoration}
                indicatorColor={StatusEnum[current.status].indicatorColor}
              >
                {StatusEnum[current.status].statusString}
              </EventStatus>
            </Flexbox>
            <Flexbox gap="10px">
              <EventDescription color={StatusEnum[current.status].headingColor}>
                <strong>Time:</strong>{' '}
                {current.status === 'upcoming'
                  ? formatUpcomingTime(current.start, current.end)
                  : `${leadingZero(current.start.getHours())}:${leadingZero(
                      current.start.getMinutes()
                    )} - ${leadingZero(current.end.getHours())}:${leadingZero(
                      current.end.getMinutes()
                    )}`}
              </EventDescription>
              <EventDescription color={StatusEnum[current.status].headingColor}>
                <strong>Location:</strong> {current.place}
              </EventDescription>
            </Flexbox>
          </Flexbox>
        </Flexbox>
      </StyledEventWrapper>
    </Wrapper>
  )
}

const Home = () => {
  const [data, setData] = useState({})
  const userId = LocalStorageUtils.getUser().id
  const token = LocalStorageUtils.getToken()
  useEffect(() => {
    const getData = async () => {
      const response = await productApi.getUser(userId, token)
      setData(response?.data.data)
    }
    getData()
  }, [token, userId])
  if (data?.status === 403) {
    // LocalStorageUtils.removeItem('token')
    return <Navigate to="/login" replace />
  }
  const images = [
    'https://images.unsplash.com/photo-1654252312924-b97fe8335258?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  ]
  const events = [
    {
      name: 'AWS Event',
      place: 'Room 404 (FPT University)',
      start: new Date(2022, 4, 20, 15, 0, 0),
      end: new Date(2022, 4, 20, 17, 0, 0),
    },
    {
      name: 'Monthly Meeting',
      place: 'FPT University',
      start: new Date(2022, 4, 20, 15, 0, 0),
      end: new Date(2022, 4, 20, 17, 0, 0),
      status: 'cancel',
    },
    {
      name: 'Monthly Meeting',
      place: 'FPT University',
      start: new Date(2022, 4, 20, 15, 0, 0),
      end: new Date(2022, 4, 20, 17, 0, 0),
      status: 'end',
    },
  ]
  const upcomingEvents = [
    {
      name: 'AWS Event',
      place: 'Room 404',
      start: new Date(2022, 4, 20, 15, 0, 0),
      end: new Date(2022, 4, 20, 17, 0, 0),
      status: 'upcoming',
    },
    {
      name: 'Monthly Meeting',
      place: 'FPT University',
      start: new Date(2022, 4, 20, 8, 0, 0),
      end: new Date(2022, 4, 21, 11, 30, 0),
      status: 'upcoming',
    },
    {
      name: 'Monthly Meeting',
      place: 'FPT University',
      start: new Date(2022, 4, 20, 15, 30, 0),
      end: new Date(2022, 4, 20, 17, 0, 0),
      status: 'upcoming',
    },
  ]

  return (
    <HomeWrapper>
      <HeaderWrapper justifyContent="space-between">
        <HeaderBrand src={Avatar} size={50} />
        <ProfileInformation user={data} />
      </HeaderWrapper>
      <ContentWrapper>
        <Content>
          <Heading title="Today" date={new Date()} dateOptions={{ hasWeekday: false }} />
          <CreateButton>Create new event</CreateButton>
          <Divider />
          <Flexbox flexDirection="column">
            {events.map((event, index) => (
              <Event key={index} event={event} />
            ))}
          </Flexbox>
        </Content>
        <Content>
          <Heading
            title="Up-coming Events"
            date={new Date(2022, 6)}
            dateOptions={{ hasWeekday: false, hasDate: false, hasMonth: false }}
          />
          <Divider />
          <Flexbox flexDirection="column">
            {upcomingEvents.map((event, index) => (
              <Event key={index} event={event} />
            ))}
          </Flexbox>
        </Content>
      </ContentWrapper>
    </HomeWrapper>
  )
}

export default Home
