import styled from 'styled-components'

import theme from './../../theme'
import Wrapper from './../Wrapper/index'
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
  const { title, ...rest } = props
  return (
    <Wrapper>
      <Label title={title} />
      <StyledWrapper fullWidth={props.fullWidth}>
        <BaseInputBox fullWidth={props.fullWidth}>
          <StyledTextArea placeholder={props.placeholder} {...rest} />
        </BaseInputBox>
      </StyledWrapper>
    </Wrapper>
  )
}

export default TextArea
