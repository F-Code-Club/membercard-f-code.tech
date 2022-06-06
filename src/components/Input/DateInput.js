import { useRef, useState } from 'react'

import DatePicker from 'sassy-datepicker'
import styled from 'styled-components'

import theme from '../../theme'
import Icon from '../Icon'
import BaseInputBox from './InputBox'

const StyledDateInput = styled.input.attrs({
  type: 'date',
})`
  font-family: 'Inter', sans-serif;
  font-weight: inherit;
  font-size: 1em;
  color: ${theme.slate4};
  background-color: transparent;
  border: none;
  outline: none;
  text-transform: uppercase;

  &::-webkit-inner-spin-button,
  &::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }

  &:active {
    border: none;
    outline: none;
  }

  &::-webkit-input-placeholder {
    font-weight: 600;
    color: ${theme.slate4};
  }
`

const StyledDatePickerWrapper = styled.div`
  position: absolute;
  top: 110%;
  left: 50%;
  transform: translateX(-50%);
`

// need to be renamed
const DateInputBox = (props) => {
  const { defaultValue, value, innerRef, ...rest } = props
  return (
    <StyledDateInput readOnly ref={innerRef} defaultValue={defaultValue} value={value} {...rest} />
  )
}

const DateInput = (props) => {
  let defaultDate = new Date()
  defaultDate.setDate(defaultDate.getDate() + 3)

  const [showDatePicker, setShowDatePicker] = useState(false)
  const [isFocused, setFocused] = useState(false)
  const [date, setDate] = useState(defaultDate)
  const boxRef = useRef(null)
  const inputRef = useRef(null)

  // const useOutsideAlerter = (ref) => {
  //   useEffect(() => {
  //     const handleClickOutside = (event) => {
  //       if (ref.current && !ref.current.contains(event.target)) {
  //         // setFocused(false)
  //       }
  //     }

  //     document.addEventListener('mousedown', handleClickOutside)
  //     return () => {
  //       document.removeEventListener('mousedown', handleClickOutside)
  //     }
  //   }, [ref])
  // }

  // useOutsideAlerter(boxRef, setFocused(false))

  const onClick = (show = true) => {
    setShowDatePicker(show)
    inputRef.current.focus()
    console.log(boxRef.current)
    console.log(inputRef.current)
  }

  const onChange = (newDate) => {
    console.log(`New date selected - ${newDate.toString()}`)
    setDate(newDate)
  }

  const onFocus = () => {
    // ref.current.focus()
    setFocused(true)
  }
  const onBlur = () => {
    setFocused(false)
  }
  return (
    <BaseInputBox
      innerRef={boxRef}
      onBlur={onBlur}
      onFocus={onFocus}
      isFocused={isFocused}
      onClick={() => onClick(!showDatePicker)}
    >
      <DateInputBox value={date.toLocaleDateString('en-CA')} innerRef={inputRef} />
      <Icon name="calendar" size="15px" />
      {showDatePicker ? (
        <StyledDatePickerWrapper>
          <DatePicker onChange={onChange} selected={date} />
        </StyledDatePickerWrapper>
      ) : (
        ''
      )}
    </BaseInputBox>
  )
}

export default DateInput
