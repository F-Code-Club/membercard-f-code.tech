import { useState } from 'react'

import DateInput from '../../components/Input/DateInput'
import TextInput from '../../components/Input/TextInput'
import TimeInput from '../../components/Input/TimeInput'
import Modal from '../../components/Modal'
import Divider from './../../components/Divider'
import Flexbox from './../../components/Flexbox'
import Wrapper from './../../components/Wrapper'

import { formatUpcomingTime, leadingZero, MONTHS, WEEKDAYS } from '../../utils/helper'
import Avatar from './../../asset/image/Avatar.png'
import theme from './../../theme'
import ViewEventModal from './ViewEventModal'
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
  let { event, onClick } = props
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
      <StyledEventWrapper onClick={onClick}>
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

const CreateEventModal = (props) => {
  const { show, onClick, onClose } = props

  const [title, setTitle] = useState('')
  const handleTitleChange = (newTitle) => {
    setTitle(newTitle)
  }

  const [startDate, setStartDate] = useState(new Date())
  const handleStartDateChange = (newDate) => {
    setStartDate(newDate)
  }

  const [endDate, setEndDate] = useState(new Date())
  const handleEndDateChange = (newDate) => {
    setEndDate(newDate)
  }

  const [location, setLocation] = useState('')
  const handleLocationChange = (newLocation) => {
    setLocation(newLocation)
  }

  return (
    <Modal show={show} title="Create new event" onClose={onClose}>
      <Flexbox flexDirection="column" gap={10}>
        <TextInput title="Title" placeholder="Insert title here..." />
        <Flexbox gap={10} justifyContent="space-between">
          <DateInput
            fullWidth={true}
            title="Start date"
            date={startDate}
            onChange={handleStartDateChange}
          />
          <DateInput
            fullWidth={true}
            title="End date"
            date={endDate}
            onChange={handleEndDateChange}
          />
        </Flexbox>
        <Flexbox gap={10} justifyContent="space-between">
          <TimeInput
            fullWidth={true}
            title="Start time"
            time={startDate}
            onChange={handleStartDateChange}
          />
          <TimeInput
            fullWidth={true}
            title="End time"
            time={endDate}
            onChange={handleEndDateChange}
          />
        </Flexbox>
        <p>{`This event will take place from ${WEEKDAYS[startDate.getDay()]}, ${
          MONTHS[startDate.getMonth()]
        } ${startDate.getDate()} ${startDate.getFullYear()} ${leadingZero(
          startDate.getHours()
        )}:${leadingZero(startDate.getMinutes())}`}</p>
      </Flexbox>
    </Modal>
  )
}

const Home = () => {
  const images = [
    'https://images.unsplash.com/photo-1654252312924-b97fe8335258?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  ]
  const user = {
    name: 'Ly Tuan Kiet',
    rollNumber: 'SE160049',
    imageUrl: images[0],
  }

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

  const [showCreateModal, toggleCreateModal] = useState(false)
  const [showViewModal, toggleViewModal] = useState(false)
  return (
    <HomeWrapper>
      <HeaderWrapper justifyContent="space-between">
        <HeaderBrand src={Avatar} size={50} />
        <ProfileInformation user={user} />
      </HeaderWrapper>
      <ContentWrapper>
        <Content>
          <Heading title="Today" date={new Date()} dateOptions={{ hasWeekday: false }} />
          <CreateButton onClick={() => toggleCreateModal(true)}>Create new event</CreateButton>
          <Divider />
          <Flexbox flexDirection="column">
            {events.map((event, index) => (
              <Event key={index} event={event} onClick={() => toggleViewModal(true)} />
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
              <Event key={index} event={event} onClick={() => toggleViewModal(true)} />
            ))}
          </Flexbox>
        </Content>
      </ContentWrapper>
      <CreateEventModal
        show={showCreateModal}
        onClick={() => toggleCreateModal(true)}
        onClose={() => toggleCreateModal(false)}
      />
      <ViewEventModal
        show={showViewModal}
        onClick={() => toggleViewModal(true)}
        onClose={() => toggleViewModal(false)}
      />
    </HomeWrapper>
  )
}

export default Home
