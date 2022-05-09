import { useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../theme';
import { CloseButton } from '../Button';
import { Divider } from '../Divider';
import Wrapper from './../Wrapper';

const StyledModal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: ${theme.low_contrast_20};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
`;
const StyledModalContent = styled.div`
  padding: 2rem;
  background-color: ${theme.plum};
  border-radius: 10px;
`;
const StyledModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-family: inherit;
`;
const StyledModalTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
`;
const StyledModalBody = styled.div`
  padding: 10px;
`;
const StyledModalFooter = styled.div`
  padding: 10px;
`;

const Modal = (props) => {
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  });

  if (!props.show) {
    return null;
  }

  return (
    <StyledModal onClick={props.onClose}>
      <Wrapper>
        <StyledModalContent onClick={(e) => e.stopPropagation()}>
          <StyledModalHeader>
            <StyledModalTitle>{props.title}</StyledModalTitle>
            <CloseButton onClick={props.onClose} />
          </StyledModalHeader>
          <Divider />
          <StyledModalBody>{props.children}</StyledModalBody>
          {/* <StyledModalFooter>
          <GreenButton>Create Event</GreenButton>
        </StyledModalFooter> */}
        </StyledModalContent>
      </Wrapper>
    </StyledModal>
  );
};

export default Modal;
