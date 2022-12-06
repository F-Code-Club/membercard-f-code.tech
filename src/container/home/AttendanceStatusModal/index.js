import React, { useState, useEffect } from 'react'

import Flexbox from '../../../components/Flexbox'
import Modal from '../../../components/Modal'

import { get } from '../../../utils/ApiCaller'
import LocalStorageUtils from '../../../utils/LocalStorageUtils'
import theme from './../../../theme'
import StatusUpdater from './StatusUpdater/index'
import { SubHeading, Heading, StyledWrapper, StatusBadge } from './style'

const MemberStatus = (props) => {
  const { data, status, onClick } = props

  return (
    <StyledWrapper onClick={onClick}>
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
  const { show, onClose, eventId } = props
  const token = LocalStorageUtils.getItem('token')
  const [data, setData] = useState([
    {
      name: 'Nguyen Nghiax',
      member_id: 'SE123213',
      status: 'not yet',
    },
  ])

  useEffect(() => {
    const getAllMembers = async () => {
      const result = await get(
        '/api/check-attendance/members',
        { event_id: eventId },
        {
          token: token,
        }
      )
        .then((response) => {
          if (response.data.status === 200) {
            return response.data.data
          }
          return response.data.message
        })
        .catch((error) => {
          console.log(error)
          return null
        })
      if (result === null || !(result instanceof Array)) {
        setData([{ name: 'Unknown error', member_id: 'Unknown error', status: 'not yet' }])
        return
      }
      setData(result)
    }

    getAllMembers()
  }, [eventId, token])
  const enumStatus = {
    attended: {
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

  const [statusUpdater, toggleStatusUpdater] = useState(false)
  const [currentUser, setCurrentUser] = useState({
    name: 'Unknown',
    member_id: 'Unknown',
    status: 'not yet',
  })
  const openStatusUpdater = (member) => {
    setCurrentUser(member)
    console.log(member)
    toggleStatusUpdater(true)
  }
  return (
    <Modal show={show} title="Attendance Status" onClose={onClose}>
      <Flexbox justifyContent="center" flexDirection="column">
        {data.map((member, index) => (
          <MemberStatus
            key={index + 'member'}
            data={member}
            status={enumStatus[member.status]}
            onClick={() => openStatusUpdater(member)}
          ></MemberStatus>
        ))}
      </Flexbox>
      <StatusUpdater
        show={statusUpdater}
        user={currentUser}
        onClose={() => toggleStatusUpdater(false)}
      />
    </Modal>
  )
}
export default AttendanceStatusModal
