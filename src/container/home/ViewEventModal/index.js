import React, { useState, useEffect } from 'react'

import { BlueButton, Button, GreenButton, RedButton } from '../../../components/Button'
import Flexbox from '../../../components/Flexbox'
// import DateInput from '../../../components/Input/DateInput'
import TextInput from '../../../components/Input/TextInput'
// import TextBox from './../../../components/TextBox/index'
import Divider from './../../../components/Divider'
import TextArea from './../../../components/Input/TextArea'
import Modal from './../../../components/Modal'

import AttendanceCard from '../AttendanceCard'
import { formatDate, formatTime } from './../../../utils/helper'
import AttendanceStatusModal from './../AttendanceStatusModal/index'

const ViewEvent = (props) => {
  const { data, onClose } = props
  const { show, event, status } = data
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
  })
  const [showAttendanceCard, toggleAttendanceCard] = useState({
    show: false,
    eventId: current.id,
  })
  const [showListAttendance, toggleListAttendance] = useState({
    show: false,
  })
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

  return (
    <Modal show={show} title={event.name} onClose={onClose} indicator={status}>
      <Flexbox flexDirection="column" gap={10}>
        <Flexbox gap={10}>
          <TextInput
            fullWidth={true}
            title="Start date"
            value={formatDate(current.start, { hasWeekday: false })}
            readOnly
            onChange={() => onEventChange(event)}
          />
          <TextInput
            fullWidth={true}
            title="End date"
            value={formatDate(current.end, { hasWeekday: false })}
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
        <TextArea title="Description" value={current.description} readOnly />
      </Flexbox>
      <Divider variant="dashed" margin={20} />
      <Flexbox flexDirection="column" gap={10}>
        <GreenButton onClick={openAttendanceCard}>Check attendance</GreenButton>
        <Flexbox gap={10}>
          <BlueButton fullWidth={true} onClick={openAttendanceCard}>
            Start
          </BlueButton>
          <RedButton fullWidth={true} onClick={openAttendanceCard}>
            End
          </RedButton>
        </Flexbox>
        <Button onClick={openViewList}>View List</Button>
        <Button onClick={openAttendanceCard}>Edit Event</Button>
      </Flexbox>
      <AttendanceCard data={showAttendanceCard} onClose={closeAttendanceCard} />
      <AttendanceStatusModal
        show={showListAttendance.show}
        onClose={closeViewList}
      ></AttendanceStatusModal>
    </Modal>
  )
}

export default ViewEvent
