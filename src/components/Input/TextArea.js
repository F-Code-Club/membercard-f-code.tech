import styled from 'styled-components'

import theme from './../../theme'
import BaseInputBox from './InputBox'
import Label from './Label'
import { StyledHeading } from './style'

const StyledTextArea = styled.textarea`
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: inherit;
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
  return (
    <StyledWrapper fullWidth={props.fullWidth}>
      <StyledHeading>{props.title}</StyledHeading>
      <BaseInputBox fullWidth={props.fullWidth}>
        <StyledTextArea placeholder={props.placeholder} />
      </BaseInputBox>
    </StyledWrapper>
  )
}

export default TextArea
