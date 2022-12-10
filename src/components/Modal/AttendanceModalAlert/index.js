import React from 'react'

// import productApi from '../../../utils/productApi'
// import { StyledEventIndicator } from '../../../container/home/style'
import { CloseButton } from '../../Button'
import Wrapper from './../../Wrapper/index'
import {
  StyledModal,
  StyledModalBody,
  StyledModalContent, // StyledModalHeader,
  // StyledModalTitle,
  // SubHeading as SubTitle,
} from './style'

const AttendanceModalAlert = (props) => {
  //   const { eventId, subTitle, title, children, onClose } = props

  if (!props.show) {
    return null
  }
  return (
    <StyledModal onClick={props.onClose}>
      <Wrapper>
        <StyledModalContent onClick={(e) => e.stopPropagation()}>
          <CloseButton size={1} onClick={props.onClose} position="top-right" positionOffset={2} />
          <StyledModalBody>{props.children}</StyledModalBody>
        </StyledModalContent>
      </Wrapper>
    </StyledModal>
  )
  //          <UpdateButton onClick={UpdateAttend}>Update</UpdateButton>
}

export default AttendanceModalAlert
