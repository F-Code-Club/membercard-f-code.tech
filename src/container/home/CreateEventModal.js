import { useState } from 'react'

import { GreenButton } from '../../components/Button'
import DateInput from '../../components/Input/DateInput'
import TextArea from '../../components/Input/TextArea'
import TextInput from '../../components/Input/TextInput'
import TimeInput from '../../components/Input/TimeInput'
import Modal from '../../components/Modal'
import Divider from './../../components/Divider'
import Flexbox from './../../components/Flexbox'

import { post } from '../../utils/ApiCaller'
import LocalStorageUtils from '../../utils/LocalStorageUtils'
import { generateStingToISOtime } from '../../utils/helper'
import { generateSemester, leadingZero } from '../../utils/helper'
import { ConfirmationParagraph } from './style'

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

  const handleSubmit = async () => {
    const testEvent = {
      description: description,
      location: location,
      name: title,
      point: 10,
      startTime: generateStingToISOtime(
        `${startDate.getFullYear()}-${
          startDate.getMonth() + 1
        }-${startDate.getDate()} ${leadingZero(startDate.getHours())}:${leadingZero(
          startDate.getMinutes()
        )}:00`
      ),
      endTime: generateStingToISOtime(
        `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()} ${leadingZero(
          endDate.getHours()
        )}:${leadingZero(endDate.getMinutes())}:00`
      ),
    }
    const event = {
      name: title,
      start_date: `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`,
      end_date: `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`,
      start_time: `${leadingZero(startDate.getHours())}:${leadingZero(startDate.getMinutes())}:00`,
      end_time: `${leadingZero(endDate.getHours())}:${leadingZero(endDate.getMinutes())}:00`,
      location: location,
      description: description,
      semester: generateSemester(startDate),
      status: 'ongoing',
    }
    const token = LocalStorageUtils.getToken()

    const response = await post(
      '/event/new',
      { ...testEvent },
      {},
      {
        Authorization: token,
      }
    ).catch((err) =>
      // eslint-disable-next-line no-console
      console.error(err)
    )
    if (response.status === 200 && response.data.status === 200) {
      onSubmit()
    }
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
            // fullWidth={true}
            title="Start date"
            date={startDate}
            onChange={handleStartDateChange}
            flexBasis="50%"
          />
          <DateInput
            // fullWidth={true}
            title="End date"
            date={endDate}
            onChange={handleEndDateChange}
            flexBasis="50%"
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
        <ConfirmationParagraph startDate={startDate} endDate={endDate} />
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
