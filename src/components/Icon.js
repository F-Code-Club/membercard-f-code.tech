import styled from 'styled-components';

const StyledIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.size || 'inherit'};
  & > ion-icon {
    font-size: inherit;
    --ionicon-stroke-width: ${props => props.weight || '16px'}em;
  }
`;

const Icon = (props) => {
  const { children, name, ...rest } = props;
  return (
    <StyledIcon {...rest}>
      <ion-icon name={name}></ion-icon>
    </StyledIcon>
  );
};

export default Icon;
