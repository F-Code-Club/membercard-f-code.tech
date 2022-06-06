import { useEffect, useRef, useState } from 'react'

import TimeKeeper from 'react-timekeeper'
import styled from 'styled-components'

import theme from '../../theme'
import { leadingZero } from '../../utils/helper'
import Icon from '../Icon'
import BaseInputBox from './InputBox'
import Label from './Label'

const StyledTimeInput = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: inherit;
  font-size: 1em;
  color: ${theme.low_contrast};
  background-color: transparent;
  border: none;
  outline: none;
  text-transform: uppercase;
  pointer-events: none;

  &::-webkit-inner-spin-button,
  &::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }

  &:active {
    border: none;
    outline: none;
  }
`

const StyledTimePickerWrapper = styled.div`
  position: absolute;
  bottom: 110%;
  left: 50%;
  transform: translateX(-50%);
`

// TODO: This component needs to be renamed
const TimeInputBox = (props) => {
  const { value, innerRef, ...rest } = props
  return (
    <StyledTimeInput readOnly ref={innerRef} {...rest}>
      {value}
    </StyledTimeInput>
  )
}

// TODO: This component needs to be renamed and refactored
const StyledTimeInputWrapper = styled.div`
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
`

const formatTime = (date) => {
  let [hours, minutes] = [date.getHours(), date.getMinutes()]
  let meridiem = 'am'

  if (hours == 0) {
    hours == 12
  } else if (hours == 12) {
    meridiem = 'pm'
  } else if (hours > 12) {
    hours -= 12
    meridiem = 'pm'
  }

  return `${hours}:${minutes}${meridiem}`
}

const formatTime24 = (date) => {
  const [hours, minutes] = [date.getHours(), date.getMinutes()]
  return `${leadingZero(hours)}:${leadingZero(minutes)}`
}

const TimeInput = (props) => {
  const { title, fullWidth, time, onChange } = props

  const [showTimePicker, setShowTimePicker] = useState(false)
  const [isFocused, setFocused] = useState(false)
  const [currentTime, setCurrentTime] = useState(time)

  const boxRef = useRef(null)

  const onClick = (show = true) => {
    setShowTimePicker(show)
    setFocused(true)
  }
  const handleChange = (newTime) => {
    setFocused(false)
    const tempTime = new Date(time.getTime())
    tempTime.setHours(newTime.hour, newTime.minute)
    setCurrentTime(tempTime)
    onChange(tempTime)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setShowTimePicker(false)
        setFocused(false)
      }
    }

    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return (
    <StyledTimeInputWrapper fullWidth={fullWidth} ref={boxRef}>
      <Label title={title} />
      <BaseInputBox
        readOnly
        isFocused={isFocused}
        onClick={() => onClick(true)}
        fullWidth={fullWidth}
      >
        <TimeInputBox value={formatTime24(currentTime)} />
        <Icon name="time" size="18px" />
        {showTimePicker ? (
          <StyledTimePickerWrapper>
            <TimeKeeper
              hour24Mode={true}
              time={formatTime24(currentTime)}
              onChange={handleChange}
            />
          </StyledTimePickerWrapper>
        ) : (
          ''
        )}
      </BaseInputBox>
    </StyledTimeInputWrapper>
  )
}

export default TimeInput
