import React from 'react'

import { BlueButton, Button, GreenButton, RedButton } from '../../../components/Button'
import Flexbox from '../../../components/Flexbox'
import DateInput from '../../../components/Input/DateInput'
import TextInput from '../../../components/Input/TextInput'
// import TextBox from './../../../components/TextBox/index'
import Divider from './../../../components/Divider/index'
import TextArea from './../../../components/Input/TextArea'
import Modal from './../../../components/Modal/index'

const ViewEvent = (props) => {
  const { show, onClick, onClose } = props
  const event = {
    name: 'Monthly Meeting',
    place: 'FPT University',
    start: new Date(2022, 4, 20, 15, 0, 0),
    end: new Date(2022, 4, 20, 17, 0, 0),
    status: 'cancel',
    description:
      '- Students must have member card to check attendance \n- The event may start 5 minutes earlier',
  }

  const checkAttendance = () => {
    console.log('checked')
  }

  return (
    <Modal show={show} title={event.name} onClose={onClose}>
      <Flexbox flexDirection="column" gap={10}>
        <Flexbox gap={10}>
          <DateInput fullWidth={true} title="Start" date={event.start} readonly={true} />
          <DateInput fullWidth={true} title="End" date={event.end} readonly={true} />
        </Flexbox>
        <TextInput title="Location" value={event.place} readonly />
        <TextArea title="Description" value={event.description} readonly />
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
