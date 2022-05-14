import styled from 'styled-components';
import theme from './../../theme';
import BaseButton from './BaseButton';

const definedPosition = {
  'top-right': {
    position: 'absolute',
    top: '1.5em',
    right: '1.5em',
  },
};

const parseCSS = (position) => {
  let result = '';
  for (let key in definedPosition[position]) {
    result = result + key + ': ' + definedPosition[position][key] + ';\n';
  }
  return result;
};

const StyledCloseButton = styled(BaseButton)`
  padding: 0.25em;
  background-color: ${theme.red2};
  color: ${theme.red1};
  border-radius: 999px;
  font-size: ${(props) => props.size}rem;
  ${(props) => (props.position ? parseCSS(props.position) : '')}

  & > ion-icon {
    --ionicon-stroke-width: 50px;
  }
`;

const CloseButton = (props) => {
  return (
    <StyledCloseButton {...props}>
      <ion-icon name="close-outline"></ion-icon>
    </StyledCloseButton>
  );
};

export { CloseButton };
