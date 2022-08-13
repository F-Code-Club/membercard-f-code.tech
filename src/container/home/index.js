import { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import Divider from './../../components/Divider'
import Flexbox from './../../components/Flexbox'

import LocalStorageUtils from '../../utils/LocalStorageUtils'
import Avatar from './../../asset/image/Avatar.png'
import { get } from './../../utils/ApiCaller'
import CreateEventModal from './CreateEventModal'
import EditEventModal from './EditEventModal'
import Event, { EventEntity, StatusEnum } from './Event'
import ViewEventModal from './ViewEventModal'
import {
  HeaderBrand,
  HeaderWrapper,
  ProfileInformation,
  Heading,
  CreateButton,
  ContentWrapper,
  Content,
  HomeWrapper,
} from './style'

const Home = () => {
  const images = [
    'https://images.unsplash.com/photo-1654252312924-b97fe8335258?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  ]
  const user = {
    name: 'Ly Tuan Kiet',
    rollNumber: 'SE160049',
    imageUrl: images[0],
  }
  const token = LocalStorageUtils.getItem('token')
  const [currentUser, setCurrentUser] = useState(null)
  console.log('Current user', currentUser)

  const [showCreateModal, toggleCreateModal] = useState(false)
  const [showViewModal, toggleViewModal] = useState({
    show: false,
    event: {},
    status: {},
  })
  const [showEditModal, toggleEditModal] = useState({
    show: false,
    event: {},
  })
  const [events, setEvents] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchEvent = async () => {
      const eventsReceiver = await get('/api/events', {}, { token: token })
        .then((response) => {
          if (response.data?.status !== 200) {
            LocalStorageUtils.removeItem('token')
            navigate('/')
            return []
          }
          return response.data.data
        })
        .catch((e) => {
          if (e.code === 'ERR_NETWORK') {
          }
          LocalStorageUtils.removeItem('token')
          navigate('/')
          return []
        })
      setEvents(eventsReceiver.filter((item) => item.status !== 'upcoming') || [])
      setUpcomingEvents(eventsReceiver.filter((item) => item.status === 'upcoming') || [])
    }
    const fetchUser = async () => {
      const fetchedUser = await LocalStorageUtils.getUser()
      setCurrentUser(fetchedUser)
    }
    fetchEvent()
    if (!currentUser) {
      fetchUser()
    }
  }, [navigate, token, currentUser])

  const displayEventModal = (data) => {
    toggleViewModal({
      show: true,
      event: data,
      status: StatusEnum[data.status],
    })
  }
  const displayEditModal = (data) => {
    toggleEditModal({
      show: true,
      event: data,
    })
  }
  const closeEventModal = () =>
    toggleViewModal({
      show: false,
      event: {},
      status: {},
    })
  const closeEditModal = () =>
    toggleEditModal({
      show: false,
      event: {},
    })

  return (
    <HomeWrapper>
      <HeaderWrapper justifyContent="space-between">
        <HeaderBrand src={Avatar} size={50} />
        <ProfileInformation user={currentUser} />
      </HeaderWrapper>
      <ContentWrapper>
        <Content>
          <Heading title="Today" date={new Date()} dateOptions={{ hasWeekday: false }} />
          <CreateButton onClick={() => toggleCreateModal(true)}>Create new event</CreateButton>
          <Divider />
          <Flexbox flexDirection="column">
            {events.map((event, index) => (
              <Event
                key={index}
                event={event}
                onClick={() => displayEventModal(event)}
                onEditToggle={() => displayEditModal(event)}
              />
            ))}
          </Flexbox>
        </Content>
        <Content>
          <Heading
            title="Up-coming Events"
            date={new Date(2022, new Date().getMonth())}
            dateOptions={{ hasWeekday: false, hasDate: false, hasMonth: false }}
          />
          <Divider />
          <Flexbox flexDirection="column">
            {upcomingEvents.map((event, index) => (
              <Event
                key={index}
                event={event}
                onClick={() => displayEventModal(event)}
                onEditToggle={() => displayEditModal(event)}
              />
            ))}
          </Flexbox>
        </Content>
      </ContentWrapper>
      <CreateEventModal
        show={showCreateModal}
        onClick={() => toggleCreateModal(true)}
        onClose={() => toggleCreateModal(false)}
        onSubmit={(newItem) => console.log(new EventEntity(newItem))}
      />
      <ViewEventModal
        data={showViewModal}
        // onClick={() => toggleViewModal(true)}
        onClose={closeEventModal}
        onToggleEdit={() => {
          console.log(showViewModal.event)
          displayEditModal(showViewModal.event)
        }}
      />
      <EditEventModal data={showEditModal} onClose={closeEditModal} />
    </HomeWrapper>
  )
}

export default Home
