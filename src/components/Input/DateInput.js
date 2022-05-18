import styled from 'styled-components';
import BaseInputBox from './InputBox';
import Icon from '../Icon';
import DatePicker from 'sassy-datepicker';
import { useState } from 'react';

const StyledDateInput = styled.input.attrs({
  type: 'date',
})`
  font-size: 1em;
  color: inherit;
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
`;

const StyledDatePickerWrapper = styled.div`
  position: absolute;
  top: 110%;
  left: 50%;
  transform: translateX(-50%);
`;

const DateInput = (props) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const onClick = (show = true) => {
    setShowDatePicker(show);
  };

  return (
    <BaseInputBox onClick={() => onClick(!showDatePicker)}>
      <StyledDateInput />
      <Icon name="calendar" size="25px" />
      {showDatePicker ? (
        <StyledDatePickerWrapper>
          <DatePicker />
        </StyledDatePickerWrapper>
      ) : (
        ''
      )}
    </BaseInputBox>
  );
};

export default DateInput;
