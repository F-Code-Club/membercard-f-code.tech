import React, { useState, useEffect } from 'react'

import { BlueButton, Button, GreenButton, RedButton } from '../../../components/Button'
import Flexbox from '../../../components/Flexbox'
import DateInput from '../../../components/Input/DateInput'
import TextInput from '../../../components/Input/TextInput'
// import TextBox from './../../../components/TextBox/index'
import Divider from './../../../components/Divider/index'
import TextArea from './../../../components/Input/TextArea'
import Modal from './../../../components/Modal/index'

const ViewEvent = (props) => {
  const { data, onClose } = props
  const { show, event, indicator } = data
  const [current, setCurrent] = useState({
    name: event.name,
    place: event.location,
    start: new Date(event.start_date),
    end: new Date(event.end_date),
    start_time: new Date(event.start_time),
    end_time: new Date(event.end_time),
    description: event.description,
    status: event.status,
  })

  useEffect(() => {
    const tmp = {
      name: event.name,
      place: event.location,
      start: new Date(),
      end: new Date(),
      start_time: new Date(),
      end_time: new Date(event.end_time),
      description: event.description,
      status: event.status || 'ongoing',
    }
    setCurrent(tmp)
  }, [event])
  console.log(current.status)
  const checkAttendance = () => {
    console.log('checked')
  }
  return (
    <Modal show={show} title={current.name} onClose={onClose} indicator={current.status}>
      <Flexbox flexDirection="column" gap={10}>
        <Flexbox gap={10}>
          <DateInput
            fullWidth={true}
            title="Start"
            date={current.start}
            readonly={true}
            onChange={() => current.start}
          />
          <DateInput
            fullWidth={true}
            title="End"
            date={current.end}
            readonly={true}
            onChange={() => current.start}
          />
        </Flexbox>
        <TextInput title="Location" value={current.place} readOnly />
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
