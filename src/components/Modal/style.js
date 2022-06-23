import styled from 'styled-components'

import theme from '../../theme'

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
  z-index: 999;
`
const StyledModalContent = styled.div`
  padding: 2rem;
  background-color: ${theme.plum};
  border-radius: 10px;
`
const StyledModalHeader = styled.div`
  display: flex;
  justify-content: ${(props) => props.justify || 'space-between'};
  align-items: center;
  padding-bottom: 10px;
  font-family: inherit;
  gap: ${(props) => props.gap + 'px' || 'auto'};
`
const StyledModalTitle = styled.h4`
  font-size: 1.6rem;
  font-weight: 600;
  margin: 0;
`
const StyledModalBody = styled.div`
  padding: 10px 0;
`
const StyledModalFooter = styled.div`
  padding-top: 10px;
`

export {
  StyledModal,
  StyledModalHeader,
  StyledModalContent,
  StyledModalTitle,
  StyledModalBody,
  StyledModalFooter,
}
