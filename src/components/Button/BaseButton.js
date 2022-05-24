import styled from 'styled-components'

import theme from './../../theme'

const StyledBaseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 1rem 2rem;
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  background-color: ${theme.slate3};
  color: ${theme.low_contrast};
  border: none;
  border-radius: 10px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 1rem;

  &:hover {
    opacity: 0.75;
  }
`

const BaseButtonWrapper = (Component, props) => {
  const { children, ...rest } = props
  return <Component {...rest}>{children}</Component>
}

const BaseButton = (props) => BaseButtonWrapper(StyledBaseButton, props)

export { BaseButton }
