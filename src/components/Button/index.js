import BaseButton from './BaseButton';
import { CloseButton } from './FixedButton';
import {
  StyledBlueButton,
  StyledRedButton,
  StyledGreenButton,
  StyledCreateButton,
} from './style';

const ButtonWrapper = (Component, props) => {
  const { children, ...rest } = props;
  return <Component {...rest}>{children}</Component>;
};

const Button = (props) => ButtonWrapper(BaseButton, props);
const BlueButton = (props) => ButtonWrapper(StyledBlueButton, props);
const RedButton = (props) => ButtonWrapper(StyledRedButton, props);
const GreenButton = (props) => ButtonWrapper(StyledGreenButton, props);
const CreateButton = (props) => ButtonWrapper(StyledCreateButton, props);

export {
  Button,
  BlueButton,
  RedButton,
  GreenButton,
  CreateButton,
  CloseButton,
};
