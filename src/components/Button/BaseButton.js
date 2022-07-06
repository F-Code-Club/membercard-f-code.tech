import styled from 'styled-components'

import theme from './../../theme'

const StyledBaseButton = styled.a`
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
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 1rem;

  &:hover {
    opacity: 0.75;
  }
`

const BaseButtonWrapper = (Component, props) => {
  const { children, onClick, ...rest } = props
  return (
    <Component onClick={onClick} {...rest}>
      {children}
    </Component>
  )
}

const BaseButton = (props) => BaseButtonWrapper(StyledBaseButton, props)

export { BaseButton }
