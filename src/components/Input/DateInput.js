import { useEffect, useRef, useState } from 'react'

import DatePicker from 'sassy-datepicker'
import styled from 'styled-components'

import theme from '../../theme'
import Icon from '../Icon'
import BaseInputBox from './InputBox'
import Label from './Label'

const StyledDateInput = styled.input.attrs({
  type: 'date',
})`
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

const StyledDatePickerWrapper = styled.div`
  position: absolute;
  top: 110%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
`

// TODO: This component needs to be renamed
const DateInputBox = (props) => {
  const { defaultValue, value, innerRef, ...rest } = props
  return (
    <StyledDateInput readOnly ref={innerRef} defaultValue={defaultValue} value={value} {...rest} />
  )
}

// TODO: This component needs to be renamed and refactored
const StyledDateInputWrapper = styled.div`
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
`

const DateInput = (props) => {
  const { title, date, fullWidth, onChange, readonly } = props
  let defaultDate = date ? date : new Date()

  const [showDatePicker, setShowDatePicker] = useState(false)
  const [isFocused, setFocused] = useState(false)
  const [currentDate, setCurrentDate] = useState(defaultDate)

  const boxRef = useRef(null)

  const onClick = (show = true) => {
    setShowDatePicker(show)
    setFocused(true)
  }
  const handleChange = (newDate) => {
    setFocused(false)
    const tempDate = new Date(date.getTime())
    tempDate.setFullYear(newDate.getFullYear(), newDate.getMonth(), newDate.getDate())
    setCurrentDate(tempDate)
    onChange(tempDate)
  }
  const onFocus = () => {
    setFocused(true)
  }
  const onBlur = () => {
    setFocused(false)
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setShowDatePicker(false)
        setFocused(false)
      }
    }

    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return (
    <StyledDateInputWrapper fullWidth={fullWidth} ref={boxRef}>
      <Label title={title} />
      <BaseInputBox
        onBlur={onBlur}
        onFocus={onFocus}
        isFocused={isFocused}
        onClick={() => onClick(true)}
        fullWidth={fullWidth}
      >
        <DateInputBox value={currentDate.toLocaleDateString('en-CA')} />
        <Icon name="calendar" size="15px" />
        {showDatePicker && !readonly ? (
          <StyledDatePickerWrapper>
            <DatePicker onChange={handleChange} selected={currentDate} />
          </StyledDatePickerWrapper>
        ) : (
          ''
        )}
      </BaseInputBox>
    </StyledDateInputWrapper>
  )
}

export default DateInput
