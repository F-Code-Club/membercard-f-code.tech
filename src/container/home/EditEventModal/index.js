import { useState } from 'react'

import { GreenButton } from '../../../components/Button'
import Divider from '../../../components/Divider'
import Flexbox from '../../../components/Flexbox'
import DateInput from '../../../components/Input/DateInput'
import TextArea from '../../../components/Input/TextArea'
import TextInput from '../../../components/Input/TextInput'
import TimeInput from '../../../components/Input/TimeInput'
import Modal from '../../../components/Modal'

import { convertStringToTime, leadingZero } from '../../../utils/helper'
import { ConfirmationParagraph } from '../style'

const EditEventModal = (props) => {
  // States
  const { data, onClose, onSubmit } = props
  const { show, event } = data
  let { name, place, start, end, start_time, end_time, description } = event
  const [eventTitle, setEventTitle] = useState(name)
  const tempStart = convertStringToTime(start_time, new Date(start))
  const tempEnd = convertStringToTime(end_time, new Date(end))
  const [eventStartDate, setEventStartDate] = useState(tempStart || new Date())
  const [eventEndDate, setEventEndDate] = useState(tempEnd || new Date())
  const [eventLocation, setEventLocation] = useState(place)
  const [eventDescription, setEventDescription] = useState(description)
  // useEffect(() => {
  //   setEventStartDate((prev) => {
  //     prev.setHours(0)
  //     prev.setMinutes(0)
  //     prev.setSeconds(0)
  //     return prev
  //   })
  //   setEventEndDate((prev) => {
  //     prev.setHours(0)
  //     prev.setMinutes(0)
  //     prev.setSeconds(0)
  //     return prev
  //   })
  // }, [])

  if (Object.keys(event).length === 0) return <></>
  // Change handlers
  const handleSubmit = () => {
    const standardizeStartDate = new Date(eventStartDate)
    standardizeStartDate.setHours(0, 0, 0)
    const standardizeEndDate = new Date(eventEndDate)
    standardizeEndDate.setHours(0, 0, 0)
    onSubmit({
      name: eventTitle,
      start_date: standardizeStartDate.toISOString(),
      end_date: standardizeEndDate.toISOString(),
      start_time: `${leadingZero(eventStartDate.getHours())}:${leadingZero(
        eventStartDate.getMinutes()
      )}:${leadingZero(eventStartDate.getSeconds())}`,
      end_time: `${leadingZero(eventEndDate.getHours())}:${leadingZero(
        eventEndDate.getMinutes()
      )}:${leadingZero(eventEndDate.getSeconds())}`,
      location: eventLocation,
      description: eventDescription,
      semester: 'SU2022',
    })
    onClose()
  }
  const handleTitleChange = (newTitle) => {
    setEventTitle(newTitle)
  }
  const handleEndDateChange = (newDate) => {
    setEventEndDate(newDate)
  }
  const handleStartDateChange = (newDate) => {
    setEventStartDate(newDate)
  }
  const handleLocationChange = (newLocation) => {
    setEventLocation(newLocation)
  }
  const handleDescriptionChange = (newDescription) => {
    setEventDescription(newDescription)
  }

  return (
    <Modal show={show} title="Edit event" onClose={onClose}>
      <Flexbox flexDirection="column" gap={10}>
        <TextInput
          title="Title"
          placeholder="Insert title here..."
          onChange={handleTitleChange}
          value={eventTitle || ''}
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
