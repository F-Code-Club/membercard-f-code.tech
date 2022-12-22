import { useState } from 'react'

import Flexbox from './../../components/Flexbox'
import Wrapper from './../../components/Wrapper'

import { put } from '../../utils/ApiCaller'
import LocalStorageUtils from '../../utils/LocalStorageUtils'
import { compareDate, formatUpcomingTime, leadingZero } from '../../utils/helper'
import { formatTimeForApi } from '../../utils/helper'
import theme from './../../theme'
import {
  StyledEventDescription,
  StyledEventHeading,
  StyledEventIndicator,
  StyledEventStatus,
  StyledEventWrapper,
  StyledEventSemester,
} from './style'

export const StatusEnum = {
  ongoing: {
    indicatorColor: theme.teal,
    statusString: 'On-going',
  },
  cancelled: {
    indicatorColor: theme.red1,
    statusString: 'Canceled',
  },
  ended: {
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

const onChangeStatus = async (event) => {
  const token = LocalStorageUtils.getToken()
  const standardizedStartDate = event.startTime.split('T')[0]
  const standardizedEndDate = event.endTime.split('T')[0]
  const response = await put(
    `/event`,
    { ...event, startTime: standardizedStartDate, endTime: standardizedEndDate },
    {},
    {
      Authorization: token,
    }
    // eslint-disable-next-line no-console
  ).catch((err) => console.error(err))
  return response
}

export class EventEntity {
  static ONGOING = 'ongoing'
  static UPCOMING = 'upcoming'
  static ENDED = 'ended'
  static ACTIVE = 'active'
  static INACTIVE = 'inactive'
  constructor(data) {
    //handle change from oldAPI to newAPI
    const eventStartTime = new Date(data.startTime)
    const eventEndTime = new Date(data.endTime)
    const startDateNewApi = data.startTime.split('T')[0]
    const endDateNewApi = data.endTime.split('T')[0]
    const startTime = formatTimeForApi(eventStartTime)
    const endTime = formatTimeForApi(eventEndTime)
    //
    this.id = data.id
    this.name = data.name
    this.start_date = new Date(startDateNewApi)

    const [startHours, startMinutes] = startTime.split(':')
    this.start_date.setHours(startHours, startMinutes, 0)

    ////
    this.end_date = new Date(endDateNewApi ? endDateNewApi : startDateNewApi)
    ////
    const [endHours, endMinutes] = endTime.split(':')
    this.end_date.setHours(endHours, endMinutes, 0)
    this.semester = data.semester
    this.location = data.location
    this.description = data.description

    const oldStatus = data.status
    // 1: active
    // 2: inactive
    //active or inactive for check attendance
    const today = new Date()
    // if else status below is to check when the event status
    if (!(data.status === EventEntity.CANCELLED)) {
      if (compareDate(this.start_date, this.end_date) === 0) {
        const compare = compareDate(this.start_date, today)

        if (compare === 0) {
          this.status = EventEntity.ONGOING
        } else if (compare > 0) {
          this.status = EventEntity.UPCOMING
        } else {
          this.status = EventEntity.ENDED
        }
      } else {
        const startCompare = compareDate(this.start_date, today)
        const endCompare = compareDate(this.end_date, today)

        if (startCompare <= 0 && endCompare >= 0) {
          this.status = EventEntity.ONGOING
        } else if (startCompare > 0) {
          this.status = EventEntity.UPCOMING
        } else if (endCompare < 0) {
          this.status = EventEntity.ENDED
        }
      }
      if (this.status !== oldStatus) {
        onChangeStatus({ ...data, status: this.status })
      }
    } else {
      this.status = data.status
    }
  }
}

const Event = (props) => {
  let { event, onClick } = props
  let { name, start_date, end_date, location, status, semester } = new EventEntity(event)

  const [eventName] = useState(name)
  const [eventStartDate] = useState(new Date(start_date))
  const [eventEndDate] = useState(new Date(end_date))
  const [eventStatus] = useState(status)
  const [eventLocation] = useState(location)
  const [eventSemester] = useState(semester)

  return (
    <Wrapper onClick={onClick}>
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
                <>
                  {eventName} <StyledEventSemester>{`(${eventSemester})`}</StyledEventSemester>
                </>
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
              {/* <EventDescription color={StatusEnum[eventStatus].headingColor}>
                <strong>Semester:</strong> {eventSemester}
              </EventDescription> */}
            </Flexbox>
          </Flexbox>
        </Flexbox>
      </StyledEventWrapper>
    </Wrapper>
  )
}

export default Event
