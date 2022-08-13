import styled from 'styled-components'

import theme from './../../theme'

const StyledInputWrapper = styled.div`
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  padding: 10px 20px;
  border-radius: 10px;
  background-color: ${theme.slate1_10};
  border: 1px solid ${(props) => (props.isFocused ? theme.high_contrast : theme.high_contrast_10)};
  font-size: 14px;
  font-weight: 500;
  color: ${theme.low_contrast};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: ${(props) =>
    props.position || props.position === 'none' ? props.position : 'relative'};
`

const BaseInputBox = (props) => {
  const { children, innerRef, ...rest } = props
  return (
    <StyledInputWrapper ref={innerRef} {...rest}>
      {children}
    </StyledInputWrapper>
  )
}

export default BaseInputBox
