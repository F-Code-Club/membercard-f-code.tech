import { useState } from 'react'

import { GreenButton } from '../../../components/Button'
import Divider from '../../../components/Divider'
import Flexbox from '../../../components/Flexbox'
import DateInput from '../../../components/Input/DateInput'
import TextArea from '../../../components/Input/TextArea'
import TextInput from '../../../components/Input/TextInput'
import TimeInput from '../../../components/Input/TimeInput'
import Modal from '../../../components/Modal'

// import { convertStringToTime } from '../../../utils/helper'
import { ConfirmationParagraph } from '../style'

const EditEventModal = (props) => {
  const { data, onClose, onSubmit } = props
  const { show, event } = data
  let { name, location, start_date, end_date, start_time, end_time, description } = event

  const [eventTitle, setEventTitle] = useState(name)
  const handleTitleChange = (newTitle) => {
    setEventTitle(newTitle)
  }

  const initialDate = new Date()
  const [eventStartDate, setEventStartDate] = useState(initialDate)
  const handleStartDateChange = (newDate) => {
    setEventStartDate(newDate)
  }

  // const tempStart = convertStringToTime(start_time)
  // setEventStartDate((prev) => {
  //   prev = prev.setHours(0, 0, 0)
  //   return prev
  // })

  const [eventEndDate, setEventEndDate] = useState(initialDate)
  const handleEndDateChange = (newDate) => {
    setEventEndDate(newDate)
  }
  // const tempEnd = convertStringToTime(end_time)
  // setEventStartDate((prev) => {
  //   console.log(prev)
  //   prev = prev.setHours(0, 0, 0)
  //   return prev
  // })

  const [eventLocation, setEventLocation] = useState('')
  const handleLocationChange = (newLocation) => {
    setEventLocation(newLocation)
  }

  const [eventDescription, setEventDescription] = useState('')
  const handleDescriptionChange = (newDescription) => {
    setEventDescription(newDescription)
  }

  if (Object.keys(event).length === 0) return <></>

  const handleSubmit = () => {
    onSubmit({
      name: eventTitle,
      start_date: eventStartDate.toISOString(),
      end_date: eventEndDate.toISOString(),
      start_time: `${eventStartDate.getHours()}:${eventStartDate.getMinutes()}:${eventStartDate.getSeconds()}`,
      end_time: `${eventEndDate.getHours()}:${eventEndDate.getMinutes()}:${eventEndDate.getSeconds()}`,
      location: location,
      description: description,
      semester: 'SU2022',
    })
    onClose()
  }

  return (
    <Modal show={show} title="Edit event" onClose={onClose}>
      <Flexbox flexDirection="column" gap={10}>
        <TextInput
          title="Title"
          placeholder="Insert title here..."
          onChange={handleTitleChange}
          value={eventTitle}
        />
        <Flexbox gap={10} justifyContent="space-between">
          <DateInput
            fullWidth={true}
            title="Start date"
            date={eventStartDate}
            onChange={handleStartDateChange}
          />
          <DateInput
            fullWidth={true}
            title="End date"
            date={eventEndDate}
            onChange={handleEndDateChange}
          />
        </Flexbox>
        <Flexbox gap={10} justifyContent="space-between">
          <TimeInput
            fullWidth={true}
            title="Start time"
            time={eventStartDate}
            onChange={handleStartDateChange}
          />
          <TimeInput
            fullWidth={true}
            title="End time"
            time={eventEndDate}
            onChange={handleEndDateChange}
          />
        </Flexbox>
        <ConfirmationParagraph startDate={eventStartDate} endDate={eventEndDate} />
        <TextInput
          title="Location"
          placeholder="Location"
          onChange={handleLocationChange}
          value={eventLocation}
        />
        <TextArea
          title="Description"
          placeholder="Your description goes here"
          value={eventDescription}
          onChange={handleDescriptionChange}
        />
        <Divider variant="dashed" />
        <GreenButton onClick={handleSubmit}>Edit event</GreenButton>
      </Flexbox>
    </Modal>
  )
}

export default EditEventModal
