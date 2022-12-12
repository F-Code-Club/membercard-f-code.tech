import React from 'react'

import SelectionInput from '../../../../components/Input/SelectionInput'
import Wrapper from '../../../../components/Wrapper'
// import Modal from '../../../../components/Modal'
import SubModal from './../../../../components/Modal/SubModal/index'

// import { SubHeading } from './../style'

const StatusUpdater = (props) => {
  const { user, show, onClose, eventId, getMember } = props

  return (
    <SubModal
      title={user.name}
      subTitle={user.member_id}
      show={show}
      eventId={eventId}
      onClose={onClose}
    >
      <Wrapper>
        <SelectionInput
          getMember={getMember}
          user={user}
          eventId={eventId}
          memberId={user.member_id}
          onClose={onClose}
        />
      </Wrapper>
    </SubModal>
  )
}

export default StatusUpdater
