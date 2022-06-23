import React from 'react'

import Flexbox from '../../../components/Flexbox'
import Modal from '../../../components/Modal'

import theme from './../../../theme'
import { SubHeading, Heading, StyledWrapper, StatusBadge } from './style'

const MemberStatus = (props) => {
  const { data, status } = props

  return (
    <StyledWrapper>
      <Flexbox justifyContent="space-between" alignItems="center">
        <Flexbox gap={5} justifyContent="center" flexDirection="column">
          <Heading>{data.name}</Heading>
          <SubHeading>{data.member_id}</SubHeading>
        </Flexbox>
        <StatusBadge color={status.color} textColor={status.textColor}>
          {data.status}
        </StatusBadge>
      </Flexbox>
    </StyledWrapper>
  )
}

const AttendanceStatusModal = (props) => {
  const { show, onClose } = props

  const enumStatus = {
    present: {
      color: theme.cyan2,
      textColor: theme.cyan1,
      statusString: 'present',
    },
    late: {
      color: theme.yellow2,
      textColor: theme.yellow1,
      statusString: 'late',
    },
    absent: {
      color: theme.red3,
      textColor: theme.red1,
      statusString: 'absent',
    },
    'not yet': {
      color: theme.slate3,
      textColor: theme.slate4,
      statusString: 'not yet',
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
      status: 'present',
    },
  ]
  console.log(enumStatus['not yet'])
  return (
    <Modal show={show} title="Attendance Status" onClose={onClose}>
      <Flexbox justifyContent="center" flexDirection="column">
        {fakeData.map((member, index) => (
          <MemberStatus
            key={index + 'member'}
            data={member}
            status={enumStatus[member.status]}
          ></MemberStatus>
        ))}
      </Flexbox>
    </Modal>
  )
}
export default AttendanceStatusModal
