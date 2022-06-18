import { useState } from 'react'

import Flexbox from './../../components/Flexbox'
import Wrapper from './../../components/Wrapper'

import { compareDate, formatUpcomingTime, leadingZero } from '../../utils/helper'
import theme from './../../theme'
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

export class EventEntity {
  static ONGOING = 'ongoing'
  static UPCOMING = 'upcoming'
  static ENDED = 'ended'
  static CANCELLED = 'cancelled'

  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.startDate = new Date(data.start_date)
    const [startHours, startMinutes] = data.start_time.split(':')
    this.startDate.setHours(startHours, startMinutes, 0)
    this.endDate = new Date(data.end_date)
    const [endHours, endMinutes] = data.end_time.split(':')
    this.endDate.setHours(endHours, endMinutes, 0)
    this.semester = data.semester
    this.location = data.location
    this.description = data.description

    const today = new Date()
    if (!data.status) {
      if (compareDate(this.startDate, this.endDate) === 0) {
        const compare = compareDate(this.startDate, today)
        if (compare === 0) {
          this.status = EventEntity.ONGOING
        } else if (compare > 0) {
          this.status = EventEntity.UPCOMING
        } else {
          this.status = EventEntity.ENDED
        }
      } else {
        const startCompare = compareDate(this.startDate, today)
        const endCompare = compareDate(this.endDate, today)

        if (startCompare <= 0 && endCompare >= 0) {
          this.status = EventEntity.ONGOING
        } else if (startCompare > 0) {
          this.status = EventEntity.UPCOMING
        } else if (endCompare < 0) {
          this.status = EventEntity.ENDED
        }
      }
    } else {
      this.status = data.status
    }
  }
}

const Event = (props) => {
  let { data } = props
  const { id, name, startDate, endDate, location, description, status, semester } = data

  const [eventId, setEventId] = useState(id)
  const [eventName, setEventName] = useState(name)
  const [eventStartDate, setEventStartDate] = useState(new Date(startDate.getTime()))
  const [eventEndDate, setEventEndDate] = useState(new Date(endDate.getTime()))
  const [eventStatus, setEventStatus] = useState(status)
  const [eventLocation, setEventLocation] = useState(location)
  const [eventSemester, setEventSemester] = useState(semester)

  return (
    <Wrapper>
      <StyledEventWrapper>
        <Flexbox gap="5">
          <StyledEventIndicator
            indicatorColor={StatusEnum[eventStatus].indicatorColor}
            style={{ transform: 'translateY(4px)' }}
          ></StyledEventIndicator>
          <Flexbox flexDirection="column" gap="5">
            <Flexbox justifyContent="space-between">
              <EventHeading
                color={StatusEnum[eventStatus].headingColor}
                textDecoration={StatusEnum[eventStatus].textDecoration}
              >
                {eventName}
              </EventHeading>
              <EventStatus
                textDecoration={StatusEnum[eventStatus].textDecoration}
                indicatorColor={StatusEnum[eventStatus].indicatorColor}
              >
                {StatusEnum[eventStatus].statusString}
              </EventStatus>
            </Flexbox>
            <Flexbox gap="10">
              <EventDescription color={StatusEnum[eventStatus].headingColor}>
                <strong>Time:</strong>{' '}
                {eventStatus === 'upcoming'
                  ? formatUpcomingTime(eventStartDate, eventEndDate)
                  : `${leadingZero(eventStartDate.getHours())}:${leadingZero(
                      eventStartDate.getMinutes()
                    )} - ${leadingZero(eventEndDate.getHours())}:${leadingZero(
                      eventEndDate.getMinutes()
                    )}`}
              </EventDescription>
              <EventDescription color={StatusEnum[eventStatus].headingColor}>
                <strong>Location:</strong> {eventLocation}
              </EventDescription>
              <EventDescription color={StatusEnum[eventStatus].headingColor}>
                <strong>Semester:</strong> {eventSemester}
              </EventDescription>
            </Flexbox>
          </Flexbox>
        </Flexbox>
      </StyledEventWrapper>
    </Wrapper>
  )
}

export default Event
