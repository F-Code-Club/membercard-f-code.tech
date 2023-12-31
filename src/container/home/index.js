import { useState, useEffect } from 'react'

import { useNavigate, Navigate } from 'react-router-dom'

import Divider from './../../components/Divider'
import Flexbox from './../../components/Flexbox'

import FCodeLogo from '../../asset/logo/F-Code.png'
import LocalStorageUtils from '../../utils/LocalStorageUtils'
import { compareDate } from '../../utils/helper'
import productApi from '../../utils/productApi'
// import Avatar from './../../asset/image/Avatar.png'
import { get, put } from './../../utils/ApiCaller'
import CreateEventModal from './CreateEventModal'
import EditEventModal from './EditEventModal'
import Event, { StatusEnum } from './Event'
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

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const result = await LocalStorageUtils.getUser()
  //     console.log(result)
  //     setCurrentUser(result.user)
  //     setCurrentAvatar(result.avatar)
  //   }
  //   if (!currentUser || !currentAvatar) {
  //     fetchUser()
  //   }
  // }, [currentUser, currentAvatar, token])

  const navigate = useNavigate()
  useEffect(() => {
    const token = LocalStorageUtils.getItem('token')
    const getData = async () => {
      const response = await productApi.getUser(token)

      await setCurrentUser(response?.data.data)
      if (response?.status === 403) {
        LocalStorageUtils.removeItem('token')
        return <Navigate to="/auth" replace />
      }
    }
    getData()
  }, [])

  useEffect(() => {
    const token = LocalStorageUtils.getItem('token')
    const fetchEvent = async () => {
      const eventsReceiver = await get('/event/all', {}, { authorization: token })
        .then((response) => {
          if (response.data?.code !== 200) {
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

      const eventDateComparator = (a, b) => {
        const startDateCompare = compareDate(new Date(a.startTime), new Date(b.startTime))
        if (startDateCompare === 0) {
          const endDateCompare = compareDate(new Date(a.endTime), new Date(b.endTime))
          return endDateCompare
        } else {
          return startDateCompare
        }
      }
      setEvents(
        eventsReceiver
          .filter((item) => {
            return compareDate(new Date(item.startTime), new Date()) === 0
          })
          .sort(eventDateComparator) || []
      )
      setUpcomingEvents(
        eventsReceiver
          .filter((item) => compareDate(new Date(item.startTime), new Date()) === 1)
          .sort(eventDateComparator) || []
      )
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
  const onSubmitEdit = async (newEvent) => {
    const token = LocalStorageUtils.getToken()
    const result = await put(`/event`, { ...newEvent }, {}, { authorization: token })

    if (result.status === 200 && result.data.code === 200) {
      navigate('/auth', { replace: true })
    }
  }
  const onToggleEdit = (event) => {
    displayEditModal(event)
  }
  const onLogout = () => {
    LocalStorageUtils.deleteUser()
    navigate('/auth')
  }

  return (
    <HomeWrapper>
      <HeaderWrapper justifyContent="space-between" alignItems="center">
        <HeaderBrand src={FCodeLogo} />
        <ProfileInformation user={currentUser} onLogout={onLogout} />
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
        onSubmit={() => navigate('/auth', { replace: true })}
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
