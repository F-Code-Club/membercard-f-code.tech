import { useState } from 'react'

import Divider from './../../components/Divider'
import Flexbox from './../../components/Flexbox'

import Avatar from './../../asset/image/Avatar.png'
import CreateEventModal from './CreateEventModal'
import Event, { EventEntity } from './Event'
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

  const dataList = [
    {
      id: '1653886444980',
      name: 'test',
      start_date: '2022-12-10T17:00:00.000Z',
      end_date: null,
      description: 'an wonderful event',
      start_time: '21:00:00',
      end_time: '22:00:00',
      semester: 'SP2022',
      location: '202',
    },
    {
      id: '1653886444981',
      name: 'test',
      start_date: '2022-12-10T17:00:00.000Z',
      end_date: null,
      description: 'an wonderful event',
      start_time: '21:00:00',
      end_time: '22:00:00',
      semester: 'SP2022',
      location: '202',
    },
    {
      id: '1653886481',
      name: 'Now',
      start_date: '2022-6-12T17:00:00.000Z',
      end_date: null,
      description: 'an wonderful event',
      start_time: '21:00:00',
      end_time: '22:00:00',
      semester: 'SP2022',
      location: '202',
    },
  ]

  const eventList = dataList.map((data) => new EventEntity(data))
  console.log(eventList)

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
  const [data, setDataList] = useState(eventList)
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
            {/* {events.map((event, index) => (
              <Event key={index} event={event} />
            ))} */}
            {/* <Event data={data} /> */}
            {data
              .filter((d) => {
                {
                  /* const { start_date: startDateStr } = d
                const startDate = new Date(startDateStr)
                const today = new Date()
                return compareDate(startDate, today) === 0 */
                }
                return d.status === EventEntity.ONGOING
              })
              .map((d) => (
                <Event key={d.id} data={d} />
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
            {/* {upcomingEvents.map((event, index) => (
              <Event key={index} event={event} />
            ))} */}
            {/* <Event data={anotherData} /> */}
            {data
              .filter((d) => {
                {
                  /* const { start_date: startDateStr } = d
                const startDate = new Date(startDateStr)
                const today = new Date()
                return compareDate(startDate, today) === 1 */
                }
                return d.status === EventEntity.UPCOMING
              })
              .map((d) => (
                <Event key={d.id} data={d} />
              ))}
          </Flexbox>
        </Content>
      </ContentWrapper>
      <CreateEventModal
        show={showCreateModal}
        onClick={() => toggleCreateModal(true)}
        onClose={() => toggleCreateModal(false)}
        onSubmit={(newEvent) => setDataList([...data, new EventEntity(newEvent)])}
      />
    </HomeWrapper>
  )
}

export default Home
