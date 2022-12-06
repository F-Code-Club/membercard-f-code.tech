import React from 'react'

import SelectionInput from '../../../../components/Input/SelectionInput'
import Wrapper from '../../../../components/Wrapper'
// import Modal from '../../../../components/Modal'
import SubModal from './../../../../components/Modal/SubModal/index'

// import { SubHeading } from './../style'

const StatusUpdater = (props) => {
  const { user, show, onClose } = props
  // console.log(user)
  return (
    <SubModal title={user.name} subTitle={user.member_id} show={show} onClose={onClose}>
      <Wrapper>
        <SelectionInput></SelectionInput>
      </Wrapper>
    </SubModal>
  )
}

export default StatusUpdater
