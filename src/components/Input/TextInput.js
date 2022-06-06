import { useState } from 'react'

import styled from 'styled-components'

import theme from '../../theme'
import BaseInputBox from './InputBox'
import Label from './Label'

const StyledTextInput = styled.input.attrs({
  type: 'text',
})`
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  border: none;
  outline: none;
  background-color: transparent;
  width: 100%;

  &::-webkit-input-placeholder {
    color: ${theme.slate4};
  }
`

const TextInput = (props) => {
  const { title, placeholder, ...rest } = props
  const [isFocused, setFocused] = useState(false)

  const onFocus = () => {
    setFocused(true)
  }

  const onBlur = () => {
    setFocused(false)
  }

  return (
    <div>
      <Label title={title} />
      <BaseInputBox isFocused={isFocused}>
        <StyledTextInput
          onFocus={onFocus}
          onBlur={onBlur}
          name={title}
          placeholder={placeholder}
          {...rest}
        />
      </BaseInputBox>
    </div>
  )
}

export default TextInput
