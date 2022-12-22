import { BaseButton } from './BaseButton'
import { CloseButton } from './FixedButton'
import {
  StyledBlueButton,
  StyledRedButton,
  StyledGreenButton,
  StyledUpdateButton,
  StyledBaseButtonNew,
} from './style'

const ButtonWrapper = (Component, props) => {
  const { children, onClick, ...rest } = props
  return (
    <Component onClick={onClick} {...rest}>
      {children}
    </Component>
  )
}
const ButtonNew = (props) => ButtonWrapper(StyledBaseButtonNew, props)
const Button = (props) => ButtonWrapper(BaseButton, props)
const BlueButton = (props) => ButtonWrapper(StyledBlueButton, props)
const RedButton = (props) => ButtonWrapper(StyledRedButton, props)
const GreenButton = (props) => ButtonWrapper(StyledGreenButton, props)
const UpdateButton = (props) => ButtonWrapper(StyledUpdateButton, props)

export { Button, BlueButton, RedButton, GreenButton, CloseButton, UpdateButton, ButtonNew }
