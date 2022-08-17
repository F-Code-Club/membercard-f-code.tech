import { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import Divider from './../../components/Divider'
import Flexbox from './../../components/Flexbox'

import LocalStorageUtils from '../../utils/LocalStorageUtils'
import Avatar from './../../asset/image/Avatar.png'
import { get } from './../../utils/ApiCaller'
// import productApi from './../../utils/productApi'
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
  const token = LocalStorageUtils.getItem('token')

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
  const [currentUser, setCurrentUser] = useState(null)
  const [currentAvatar, setCurrentAvatar] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const result = await LocalStorageUtils.getUser()
      setCurrentUser(result.user)
      setCurrentAvatar(result.avatar)
    }
    if (!currentUser || !currentAvatar) {
      fetchUser()
    }
  }, [currentUser, currentAvatar])

  const navigate = useNavigate()
  // useEffect(() => {
  //   const token = LocalStorageUtils.getItem('token')
  //   const userId = LocalStorageUtils.getJWTUser().id
  //   const getData = async () => {
  //     const response = await productApi.getUser(userId, token)
  //     console.log('Response', response)
  //     setCurrentUser(response?.data.data)
  //     if (response?.status === 403) {
  //       LocalStorageUtils.removeItem('token')
  //       return <Navigate to="/login" replace />
  //     }
  //   }
  //   getData()
  // }, [])

  useEffect(() => {
    const token = LocalStorageUtils.getItem('token')
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
    fetchEvent()
  }, [token, navigate])

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
    toggleEditModal((prev) => ({
      ...prev,
      show: false,
      event: {},
    }))
  const onSubmitEdit = (newEvent) => {
    console.log('Receive', newEvent)
  }
  const onToggleEdit = (event) => {
    displayEditModal(event)
  }
  const onLogout = () => {
    LocalStorageUtils.deleteUser()
    navigate('/login')
  }

  return (
    <HomeWrapper>
      <HeaderWrapper justifyContent="space-between">
        <HeaderBrand src={Avatar} size={50} />
        <ProfileInformation user={currentUser} avatar={currentAvatar} onLogout={onLogout} />
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
                onClick={() => {
                  displayEventModal(event)
                  console.log(event)
                }}
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
        onToggleEdit={onToggleEdit}
      />
      {showEditModal.show ? (
        <EditEventModal data={showEditModal} onClose={closeEditModal} onSubmit={onSubmitEdit} />
      ) : (
        <></>
      )}
    </HomeWrapper>
  )
}

export default Home
