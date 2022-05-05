import styled from 'styled-components';
import BaseButton from './BaseButton';
import { CloseButton } from './FixedButton';

const Button = (props) => {
  const { children, ...rest } = props;
  return <BaseButton {...rest}>{children}</BaseButton>;
};

const StyledBlueButton = styled(BaseButton)`
  color: ${(props) => props.theme.indigo3};
  background-color: ${(props) => props.theme.indigo1};
`;

const BlueButton = (props) => {
  const { children, ...rest } = props;
  return <StyledBlueButton {...rest}>{children}</StyledBlueButton>;
};

export { Button, BlueButton, CloseButton };
