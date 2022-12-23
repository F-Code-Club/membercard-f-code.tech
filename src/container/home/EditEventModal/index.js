import { useState } from 'react'

import { GreenButton } from '../../../components/Button'
import Divider from '../../../components/Divider'
import Flexbox from '../../../components/Flexbox'
import DateInput from '../../../components/Input/DateInput'
import TextArea from '../../../components/Input/TextArea'
import TextInput from '../../../components/Input/TextInput'
import TextInputForPoint from '../../../components/Input/TextInputForPoint'
import TimeInput from '../../../components/Input/TimeInput'
import Modal from '../../../components/Modal'

import {
  convertStringToTime,
  formatTimeByPattern,
  leadingZero,
  generateStingToISOtime,
} from '../../../utils/helper'
import { ConfirmationParagraph } from '../style'

const EditEventModal = (props) => {
  // States
  const { data, onClose, onSubmit } = props
  const { show, event } = data

  let { id, name, place, start, end, start_time, end_time, status, description, semester, point } =
    event

  const [eventTitle, setEventTitle] = useState(name)
  const tempStart = convertStringToTime(start_time, new Date(start))
  const tempEnd = convertStringToTime(end_time, new Date(end))
  const [eventStartDate, setEventStartDate] = useState(tempStart || new Date())
  const [eventEndDate, setEventEndDate] = useState(tempEnd || new Date())
  const [eventLocation, setEventLocation] = useState(place)
  const [eventDescription, setEventDescription] = useState(description)
  const [pointNew, setPointNew] = useState(point)
  if (Object.keys(event).length === 0) return <></>

  // Change handlers
  const handleSubmit = () => {
    const standardizeStartDate = new Date(eventStartDate)
    standardizeStartDate.setHours(0, 0, 0)
    const standardizeEndDate = new Date(eventEndDate)
    standardizeEndDate.setHours(0, 0, 0)
    const formatDateAsSQLDate = (date) => {
      if (!date) return ''
      return formatTimeByPattern(date, 'yyyy-MM-dd')
    }

    onSubmit({
      id: id,
      name: eventTitle,
      startTime: generateStingToISOtime(
        `${eventStartDate.getFullYear()}-${
          eventStartDate.getMonth() + 1
        }-${eventStartDate.getDate()} ${leadingZero(eventStartDate.getHours())}:${leadingZero(
          eventStartDate.getMinutes()
        )}:00`
      ),
      endTime: generateStingToISOtime(
        `${eventEndDate.getFullYear()}-${
          eventEndDate.getMonth() + 1
        }-${eventEndDate.getDate()} ${leadingZero(eventEndDate.getHours())}:${leadingZero(
          eventEndDate.getMinutes()
        )}:00`
      ),
      location: eventLocation,
      description: eventDescription,
    })
    onClose()
  }
  const handleTitleChange = (newTitle) => {
    setEventTitle(newTitle)
  }
  const handlePointChange = (newPoint) => {
    setPointNew(newPoint)
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
        <TextInputForPoint
          title="Point"
          placeholder="Point"
          onChange={handlePointChange}
          value={pointNew}
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
