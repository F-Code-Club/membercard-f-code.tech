import { BaseButton } from './BaseButton'
import { CloseButton } from './FixedButton'
import { StyledBlueButton, StyledRedButton, StyledGreenButton, StyledUpdateButton } from './style'

const ButtonWrapper = (Component, props) => {
  const { children, onClick, ...rest } = props
  return (
    <Component onClick={onClick} {...rest}>
      {children}
    </Component>
  )
}

const Button = (props) => ButtonWrapper(BaseButton, props)
const BlueButton = (props) => ButtonWrapper(StyledBlueButton, props)
const RedButton = (props) => ButtonWrapper(StyledRedButton, props)
const GreenButton = (props) => ButtonWrapper(StyledGreenButton, props)
const UpdateButton = (props) => ButtonWrapper(StyledUpdateButton, props)

export { Button, BlueButton, RedButton, GreenButton, CloseButton, UpdateButton }
