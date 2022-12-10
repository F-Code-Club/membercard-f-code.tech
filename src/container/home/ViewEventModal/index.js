import React, { useState, useEffect, useContext } from 'react'

import { BlueButton, Button, GreenButton, RedButton } from '../../../components/Button'
import Flexbox from '../../../components/Flexbox'
import TextInput from '../../../components/Input/TextInput'
import Divider from './../../../components/Divider'
import TextArea from './../../../components/Input/TextArea'
import Modal from './../../../components/Modal'

import { UserContext } from '../../../utils/IdMemberHashContext/user.context'
import AttendanceCard from '../AttendanceCard'
import { formatDate, formatTime } from './../../../utils/helper'
import AttendanceStatusModal from './../AttendanceStatusModal/index'

const ViewEvent = (props) => {
  const { setEventId } = useContext(UserContext)
  // States
  const { data, onClose, onToggleEdit } = props
  const { show, event, status } = data
  if (event.end_date === null) event.end_date = event.start_date // If the end date is null, automatically set it to the start date
  const [current, setCurrent] = useState({
    id: event.id,
    name: event.name,
    place: event.location,
    start: new Date(event.start_date || '2002-12-12'),
    end: new Date(event.end_date || '2002-12-12'),
    start_time: event.start_time || '',
    end_time: event.end_time || '',
    description: event.description,
    status: event.status,
    semester: event.semester,
  })
  const [showAttendanceCard, toggleAttendanceCard] = useState({
    show: false,
    eventId: current.id,
  })
  const [showListAttendance, toggleListAttendance] = useState({
    show: false,
  })

  // Change handlers
  const onEventChange = (event) => {
    if (!event) {
      return
    }
    const tmp = {
      id: event.id,
      name: event.name,
      place: event.location,
      start: new Date(event.start_date),
      end: new Date(event.end_date),
      start_time: event.start_time || '',
      end_time: event.end_time || '',
      description: event.description,
      status: event.status || {},
      semester: event.semester,
    }
    setCurrent(tmp)
  }
  useEffect(() => {
    onEventChange(event)
  }, [event])
  const openAttendanceCard = () => {
    toggleAttendanceCard({
      show: true,
      eventId: current.id,
    })
  }
  const closeAttendanceCard = () => {
    toggleAttendanceCard({
      show: false,
    })
  }
  const openViewList = () => {
    toggleListAttendance({
      show: true,
    })
  }
  const closeViewList = () => {
    toggleListAttendance({
      show: false,
    })
  }
  setEventId(event)

  return (
    <Modal show={show} title={event.name} onClose={onClose} indicator={status}>
      <Flexbox flexDirection="column" gap={10}>
        <Flexbox gap={10}>
          <TextInput
            fullWidth={true}
            title="Start date"
            value={formatDate(current.start, { hasWeekday: false, useShortDate: true })}
            readOnly
            onChange={() => onEventChange(event)}
          />
          <TextInput
            fullWidth={true}
            title="End date"
            value={formatDate(current.end, { hasWeekday: false, useShortDate: true })}
            readOnly
            onChange={() => onEventChange(event)}
          />
        </Flexbox>
        <Flexbox gap={10}>
          <TextInput
            fullWidth={true}
            title="Start time"
            value={formatTime(current.start_time)}
            readOnly
            onChange={() => onEventChange(event)}
          />
          <TextInput
            fullWidth={true}
            title="End time"
            value={formatTime(current.end_time)}
            readOnly
            onChange={() => onEventChange(event)}
          />
        </Flexbox>
        <TextInput
          title="Location"
          value={event.location}
          onChange={(e) => onEventChange(e, event)}
          readOnly
        />
        <TextArea title="Description" value={current.description || ''} readOnly />
      </Flexbox>
      <Divider variant="dashed" margin={20} />
      <Flexbox flexDirection="column" gap={10}>
        <GreenButton onClick={openAttendanceCard} D>
          Check attendance
        </GreenButton>
        <Flexbox gap={10}>
          <BlueButton fullWidth={true} onClick={openAttendanceCard}>
            Start
          </BlueButton>
          <RedButton fullWidth={true} onClick={openAttendanceCard}>
            End
          </RedButton>
        </Flexbox>
        <Button onClick={openViewList}>View List</Button>
        <Button onClick={() => onToggleEdit(current)}>Edit Event</Button>
      </Flexbox>
      <AttendanceCard
        data={showAttendanceCard}
        openViewList={openViewList}
        onClose={closeAttendanceCard}
      />
      <AttendanceStatusModal
        show={showListAttendance.show}
        onClose={closeViewList}
        eventId={current.id}
      />
    </Modal>
  )
}

export default ViewEvent
