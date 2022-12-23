import { useState } from 'react'

import styled from 'styled-components'

import theme from '../../theme'
import BaseInputBox from './InputBox'
import Label from './Label'

const StyledTextInput = styled.input.attrs({
  type: 'number',
})`
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  border: none;
  outline: none;
  background-color: transparent;
  width: 100%;
  white-space: wrap;
  color: ${theme.low_contrast};

  &::-webkit-input-placeholder {
    color: ${theme.slate4};
  }
  &:-webkit-disabled {
    color: ${theme.low_contrast_20};
  }
`

const TextInputForPoint = (props) => {
  // States
  const { title, placeholder, value, onChange, ...rest } = props
  const [isFocused, setFocused] = useState(false)

  // Change handlers
  const onFocus = () => {
    setFocused(true)
  }
  const onBlur = () => {
    setFocused(false)
  }
  const onTextChange = (event) => {
    const data = event.target.value
    onChange(data)
  }

  return (
    <div {...rest}>
      <Label title={title} />
      <BaseInputBox isFocused={isFocused}>
        <StyledTextInput
          onFocus={onFocus}
          onBlur={onBlur}
          name={title}
          placeholder={placeholder}
          value={value}
          onChange={onTextChange}
          {...rest}
        />
      </BaseInputBox>
    </div>
  )
}

export default TextInputForPoint
