import styled from 'styled-components';
import BaseButton from './BaseButton';
import { CloseButton } from './FixedButton';
import theme from '../../theme';

const ButtonWrapper = (Component, props) => {
  const { children, ...rest } = props;
  return <Component {...rest}>{children}</Component>;
};

const StyledBlueButton = styled(BaseButton)`
  color: ${theme.indigo3};
  background-color: ${theme.indigo1};
`;
const StyledRedButton = styled(BaseButton)`
  color: ${theme.red1};
  background-color: ${theme.red2};
`;
const StyledGreenButton = styled(BaseButton)`
  color: ${theme.plum};
  background-color: ${theme.cyan1};
  box-shadow: 1.6px 1.3px 3.7px rgba(0, 0, 0, 0.012),
    5.4px 4.5px 12.5px rgba(0, 0, 0, 0.018), 24px 20px 56px rgba(0, 0, 0, 0.03);
`;
const StyledCreateButton = styled(BaseButton)`
  justify-content: flex-start;
  gap: 10px;
  padding: 1rem;
  color: ${theme.slate4};
  background-color: transparent;
  transition: color 0.25s ease-in-out;

  &:hover {
    background-color: ${theme.slate1_10};
    opacity: 1;
  }
`;

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
