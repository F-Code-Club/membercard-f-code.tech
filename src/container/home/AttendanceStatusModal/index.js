import React from 'react'

import Flexbox from '../../../components/Flexbox'
import Modal from '../../../components/Modal'

import theme from './../../../theme'
import { SubHeading, Heading, StyledWrapper } from './style'

const MemberStatus = (props) => {
  const { data } = props

  return (
    <StyledWrapper>
      <Flexbox justifyContent="space-between" alignItems="center">
        <Flexbox gap={5} justifyContent="center" flexDirection="column">
          <Heading>{data.name}</Heading>
          <SubHeading>{data.member_id}</SubHeading>
        </Flexbox>
      </Flexbox>
    </StyledWrapper>
  )
}

const AttendanceStatusModal = (props) => {
  const { show, onClose } = props

  const enumStatus = {
    present: {
      color: theme.cyan2,
    },
    late: {
      color: theme.yellow2,
    },
    absent: {
      color: theme.red3,
    },
    'not yet': {
      color: theme.state3,
    },
  }
  const fakeData = [
    {
      name: 'Nguyen Nghiax',
      member_id: 'SE123213',
      status: 'not yet',
    },
    {
      name: 'Nguyen Nghiax',
      member_id: 'SE123213',
      status: 'not yet',
    },
    {
      name: 'Nguyen Nghiax',
      member_id: 'SE123213',
      status: 'not yet',
    },
    {
      name: 'Nguyen Nghiax',
      member_id: 'SE123213',
      status: 'not yet',
    },
  ]
  return (
    <Modal show={show} title="Attendance Status" onClose={onClose}>
      <Flexbox justifyContent="center" flexDirection="column">
        {fakeData.map((member, index) => (
          <MemberStatus key={index + 'member'} data={member}></MemberStatus>
        ))}
      </Flexbox>
    </Modal>
  )
}
export default AttendanceStatusModal
