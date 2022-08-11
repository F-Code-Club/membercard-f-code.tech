import { useState, useEffect } from 'react'

import { Navigate, useNavigate } from 'react-router-dom'

import Divider from './../../components/Divider'
import Flexbox from './../../components/Flexbox'

import LocalStorageUtils from '../../utils/LocalStorageUtils'
import Avatar from './../../asset/image/Avatar.png'
import { get } from './../../utils/ApiCaller'
import productApi from './../../utils/productApi'
import CreateEventModal from './CreateEventModal'
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
  //data get from BE
  const [data, setData] = useState({})
  const [showCreateModal, toggleCreateModal] = useState(false)
  const [showViewModal, toggleViewModal] = useState({
    show: false,
    event: {},
    status: {},
  })
  const [events, setEvents] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const token = LocalStorageUtils.getItem('token')
    const userId = LocalStorageUtils.getUser().id
    const getData = async () => {
      const response = await productApi.getUser(userId, token)
      setData(response?.data.data)
      if (response?.status === 403) {
        LocalStorageUtils.removeItem('token')
        return <Navigate to="/login" replace />
      }
    }
    getData()
  }, [])

  useEffect(() => {
    const token = LocalStorageUtils.getItem('token')
    const fetchEvent = async () => {
      const eventsReceiver = await get('/api/events', {}, { token: token }).then((response) => {
        if (response.data.status === 403) {
          LocalStorageUtils.removeItem('token')
          navigate('/')
          return []
        }
        return response.data.data
      })
      setEvents(eventsReceiver.filter((item) => item.status !== 'upcoming') || [])
      setUpcomingEvents(eventsReceiver.filter((item) => item.status === 'upcoming') || [])
    }
    fetchEvent()
  }, [navigate])

  const images = [
    'https://images.unsplash.com/photo-1654252312924-b97fe8335258?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  ]

  const displayEventModal = (data) => {
    toggleViewModal({
      show: true,
      event: data,
      status: StatusEnum[data.status],
    })
  }
  const closeEventModal = () =>
    toggleViewModal({
      show: false,
      event: {},
      status: {},
    })
  return (
    <HomeWrapper>
      <HeaderWrapper justifyContent="space-between">
        <HeaderBrand src={Avatar} size={50} />
        <ProfileInformation user={data} />
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
              <Event key={index} event={event} onClick={() => displayEventModal(event)} />
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
      />
    </HomeWrapper>
  )
}

export default Home
