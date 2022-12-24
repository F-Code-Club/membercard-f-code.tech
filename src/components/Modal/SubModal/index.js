import React from 'react'

import { put } from '../../../utils/ApiCaller'
import LocalStorageUtils from '../../../utils/LocalStorageUtils'
// import productApi from '../../../utils/productApi'
// import { StyledEventIndicator } from '../../../container/home/style'
import { CloseButton } from '../../Button'
import {
  StyledModal,
  StyledModalBody,
  StyledModalContent,
  StyledModalHeader,
  StyledModalTitle,
} from '../style'
import Wrapper from './../../Wrapper/index'
import { SubHeading as SubTitle } from './style'

const SubModal = (props) => {
  const { eventId, subTitle } = props

  const UpdateAttend = async () => {
    const token = LocalStorageUtils.getToken()

    const response = await put(
      '/api/check-attendance',
      { member_id: subTitle, event_id: eventId, status: 'absent' },
      {},
      { token: token }
    )
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err))
  }
  if (!props.show) {
    return null
  }
  return (
    <StyledModal onClick={props.onClose}>
      <Wrapper>
        <StyledModalContent onClick={(e) => e.stopPropagation()}>
          <CloseButton size={1} onClick={props.onClose} position="top-right" positionOffset={2} />
          <StyledModalHeader direction={'column'} align="left" gap={4}>
            <StyledModalTitle>{props.title}</StyledModalTitle>
            <SubTitle>{props.subTitle}</SubTitle>
          </StyledModalHeader>
          <StyledModalBody>{props.children}</StyledModalBody>
        </StyledModalContent>
      </Wrapper>
    </StyledModal>
  )
}

export default SubModal
