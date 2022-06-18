import { useState } from 'react'

import styled from 'styled-components'

import theme from './../../theme'
import BaseInputBox from './InputBox'
import Label from './Label'

const StyledTextArea = styled.textarea`
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
  resize: none;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }

  &::-webkit-input-placeholder {
    color: ${theme.slate4};
  }
`

const StyledWrapper = styled.div`
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
`

const TextArea = (props) => {
  const { fullWidth, title, value, onChange, placeholder } = props
  const handleChange = (event) => {
    onChange(event.target.value)
  }
  const [isFocused, setFocused] = useState(false)
  const onFocus = () => {
    setFocused(true)
  }
  const onBlur = () => {
    setFocused(false)
  }
  return (
    <StyledWrapper fullWidth={props.fullWidth}>
      <Label title={title} />
      <BaseInputBox isFocused={isFocused} fullWidth={fullWidth}>
        <StyledTextArea
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          rows={5}
        />
      </BaseInputBox>
    </StyledWrapper>
  )
}

export default TextArea
