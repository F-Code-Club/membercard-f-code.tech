import React from 'react'

import styled from 'styled-components'

import theme from './../../theme'
import Label from './../Input/Label'
import Wrapper from './../Wrapper/index'

const StyledTextBox = styled.div`
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
    background-color: ${theme.slate4};
  }
`

const StyledWrapper = styled.div`
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
`

const TextBox = (props) => {
  const { title, content, ...rest } = props

  return (
    <Wrapper>
      <Label title={title} />
      <StyledWrapper>
        <StyledTextBox>{content}</StyledTextBox>
      </StyledWrapper>
    </Wrapper>
  )
}
export default TextBox
