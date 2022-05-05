import styled from 'styled-components';
import theme from './../../theme';
import BaseButton from './BaseButton';

const StyledCloseButton = styled(BaseButton)`
  padding: 0.25em;
  background-color: ${(props) => props.theme.red2};
  color: ${(props) => props.theme.red1};
  border-radius: 999px;
  font-size: ${(props) => props.size}rem;

  & > ion-icon {
    --ionicon-stroke-width: 50px;
  }
`;

const CloseButton = (props) => {
  return (
    <StyledCloseButton theme={theme} size={props.size} onClick={props.onClick}>
      <ion-icon name="close-outline"></ion-icon>
    </StyledCloseButton>
  );
};

export { CloseButton };
