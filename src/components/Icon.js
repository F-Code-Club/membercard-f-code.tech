import styled from 'styled-components';

const Icon = ({ className, name }) => {
  return (
    <div className={className}>
      <ion-icon name={name}></ion-icon>
    </div>
  );
};

const StyledIcon = styled(Icon)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.size || 'inherit'};
  & > ion-icon {
    font-size: inherit;
  }
`;

export default StyledIcon;
