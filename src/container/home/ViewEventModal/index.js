import React, { useState, useEffect } from 'react'

import { BlueButton, Button, GreenButton, RedButton } from '../../../components/Button'
import Flexbox from '../../../components/Flexbox'
// import DateInput from '../../../components/Input/DateInput'
import TextInput from '../../../components/Input/TextInput'
// import TextBox from './../../../components/TextBox/index'
import Divider from './../../../components/Divider/index'
import TextArea from './../../../components/Input/TextArea'
import Modal from './../../../components/Modal/index'

import { formatDate, formatTime } from './../../../utils/helper'

const ViewEvent = (props) => {
  const { data, onClose } = props
  const { show, event, status } = data
  const [current, setCurrent] = useState({
    name: event.name,
    place: event.location,
    start: new Date(event.start_date || '2002-12-12'),
    end: new Date(event.end_date || '2002-12-12'),
    start_time: event.start_time || '',
    end_time: event.end_time || '',
    description: event.description,
    status: event.status,
  })

  const onEventChange = (event) => {
    if (!event) {
      return
    }
    const tmp = {
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

  const checkAttendance = () => {
    // console.log('checked')
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
        <GreenButton onClick={checkAttendance}>Check attendance</GreenButton>
        <Flexbox gap={10}>
          <BlueButton fullWidth={true} onClick={checkAttendance}>
            Start
          </BlueButton>
          <RedButton fullWidth={true} onClick={checkAttendance}>
            End
          </RedButton>
        </Flexbox>
        <Button onClick={checkAttendance}>View List</Button>
        <Button onClick={checkAttendance}>Edit Event</Button>
      </Flexbox>
    </Modal>
  )
}

export default ViewEvent
