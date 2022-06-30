import { useState } from 'react'

import { GreenButton } from '../../components/Button'
import DateInput from '../../components/Input/DateInput'
import TextArea from '../../components/Input/TextArea'
import TextInput from '../../components/Input/TextInput'
import TimeInput from '../../components/Input/TimeInput'
import Modal from '../../components/Modal'
import Divider from './../../components/Divider'
import Flexbox from './../../components/Flexbox'

import { Paragraph } from './style'

const CreateEventModal = (props) => {
  const { show, onClose, onSubmit } = props

  const [title, setTitle] = useState('')
  const handleTitleChange = (newTitle) => {
    setTitle(newTitle)
  }

  const [startDate, setStartDate] = useState(new Date())
  const handleStartDateChange = (newDate) => {
    setStartDate(newDate)
  }

  const [endDate, setEndDate] = useState(new Date())
  const handleEndDateChange = (newDate) => {
    setEndDate(newDate)
  }

  const [location, setLocation] = useState('')
  const handleLocationChange = (newLocation) => {
    setLocation(newLocation)
  }

  const [description, setDescription] = useState('')
  const handleDescriptionChange = (newDescription) => {
    setDescription(newDescription)
  }

  const handleSubmit = () => {
    onSubmit({
      name: title,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      start_time: `${startDate.getHours()}:${startDate.getMinutes()}:${startDate.getSeconds()}`,
      end_time: `${endDate.getHours()}:${endDate.getMinutes()}:${endDate.getSeconds()}`,
      location: location,
      description: description,
      semester: 'SU2022',
    })
    onClose()
  }

  return (
    <Modal show={show} title="Create new event" onClose={onClose}>
      <Flexbox flexDirection="column" gap={10}>
        <TextInput
          title="Title"
          placeholder="Insert title here..."
          onChange={handleTitleChange}
          value={title}
        />
        <Flexbox gap={10} justifyContent="space-between">
          <DateInput
            fullWidth={true}
            title="Start date"
            date={startDate}
            onChange={handleStartDateChange}
          />
          <DateInput
            fullWidth={true}
            title="End date"
            date={endDate}
            onChange={handleEndDateChange}
          />
        </Flexbox>
        <Flexbox gap={10} justifyContent="space-between">
          <TimeInput
            fullWidth={true}
            title="Start time"
            time={startDate}
            onChange={handleStartDateChange}
          />
          <TimeInput
            fullWidth={true}
            title="End time"
            time={endDate}
            onChange={handleEndDateChange}
          />
        </Flexbox>
        <Paragraph startDate={startDate} endDate={endDate} />
        <TextInput
          title="Location"
          placeholder="Location"
          onChange={handleLocationChange}
          value={location}
        />
        <TextArea
          title="Description"
          placeholder="Your description goes here"
          value={description}
          onChange={handleDescriptionChange}
        />
        <Divider variant="dashed" />
        <GreenButton onClick={handleSubmit}>Create new event</GreenButton>
      </Flexbox>
    </Modal>
  )
}

export default CreateEventModal
