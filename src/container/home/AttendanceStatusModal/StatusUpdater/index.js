import React from 'react'

import SelectionInput from '../../../../components/Input/SelectionInput'
import Wrapper from '../../../../components/Wrapper'
// import Modal from '../../../../components/Modal'
import SubModal from './../../../../components/Modal/SubModal/index'

// import { SubHeading } from './../style'

const StatusUpdater = (props) => {
  const { user, show, onClose, eventId, getMember, event } = props
  console.log('Line 12: ', user)
  return (
    <SubModal
      title={` ${user.firstName} ${user.lastName} `}
      subTitle={user.studentId}
      show={show}
      eventId={eventId}
      onClose={onClose}
    >
      <Wrapper>
        <SelectionInput
          event={event}
          getMember={getMember}
          user={user}
          eventId={eventId}
          memberId={user.studentId}
          onClose={onClose}
        />
      </Wrapper>
    </SubModal>
  )
}

export default StatusUpdater
