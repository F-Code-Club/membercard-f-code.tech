import React, { useEffect, useState } from 'react'

import Select, { components } from 'react-select'
import styled from 'styled-components'

import { put, post } from '../../utils/ApiCaller'
import LocalStorageUtils from '../../utils/LocalStorageUtils'
import productApi from '../../utils/productApi'
import { UpdateButton } from '../Button'
import Flexbox from '../Flexbox'
import Wrapper from '../Wrapper'
import theme from './../../theme'
import Label from './Label'
import TextArea from './TextArea'
import TextInput from './TextInput'

// import TextInputForPoint from './TextInputForPoint'

// import TextInputVer2 from './TextInputVe2'

const StyledSelectionBox = styled(Select)`
  width: 100%;
`
const TextCurrentBalance = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 8px;
  line-height: 10px;
  /* identical to box height */

  text-align: center;

  margin-top: 5px;

  color: #687076;
`
const StyledControl = styled(components.Control)`
  color: ${theme.low_contrast};
  padding: 1px;
  background-color: ${theme.slate1};
  border-radius: 10px;
`
const styledIndicatorSeparator = styled(components.IndicatorSeparator)`
  display: none;
`
const SelectionInput = ({ user, eventId, memberId, onClose, getMember, event }) => {
  const options = [
    {
      value: 'ON_TIME',
      label: 'ON_TIME',
    },
    {
      value: 'LATE',
      label: 'LATE',
    },
  ]

  const [data, setData] = useState()
  const [bonus, setBonus] = useState(0)
  const handleBonusChange = (newBonus) => {
    setBonus(newBonus)
  }
  const [statusUpdate, setStatusUpdate] = useState(user.state)
  const handleStatusChange = (newStatus) => {
    setStatusUpdate(newStatus)
  }
  const [reason, setReason] = useState('')
  const handleReasonChange = (newReason) => {
    setReason(newReason)
  }

  const UpdateAttend = async () => {
    const token = LocalStorageUtils.getToken()
    const formateAttendUpdate = {
      date: event.start,
      eventId: eventId,
      eventName: event.name,
      id: user.id,
      lastName: user.lastName,
      memberId: user.memberId,
      state: statusUpdate,
      studentId: user.studentId,
    }

    const formatPlusPoint = {
      date: event.start,
      memberId: user.memberId,
      quantity: bonus,
      reason: reason,
    }
    const resUpdateAttend = await put(
      '/attendance',
      formateAttendUpdate,
      {},
      { authorization: token }
    )
      .then((res) => {
        if (res.status === 200) {
          const result = getMember()
        }
      })
      .catch((err) => console.log(err))

    const resUpdatePoints = post('/pluspoint/new', formatPlusPoint, {}, { authorization: token })
      .then((res) => {
        if (res.status === 200) {
          const result = getMember()
        }
      })
      .catch((err) => console.log(err))

    onClose()
  }
  useEffect(() => {
    const getUserInfo = async () => {
      const token = LocalStorageUtils.getToken()
      const result = await productApi
        .getTotalPointOfMember(user.memberId, token)
        .then((result) => {
          return result.data.data
        })
        .catch((err) => console.log(err))
      await setData(result)
    }
    if (user) {
      getUserInfo()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let newPoints = 0
  if (data?.length !== 0) {
    for (let i = 0; i < data?.length; i++) {
      let quantity = data[i].quantity
      newPoints += quantity
    }
  }

  return (
    <Wrapper>
      {user && (
        <Flexbox flexDirection="column" alignItems="flex-end">
          <Flexbox flexDirection="row" gap={10}>
            <div style={{ width: '100%' }}>
              <Label title="Status" />
              <StyledSelectionBox
                options={options}
                title="User"
                onChange={(e) => {
                  handleStatusChange(e.value)
                }}
                components={{
                  Control: StyledControl,
                  IndicatorSeparator: styledIndicatorSeparator,
                }}
                theme={(curTheme) => {
                  return {
                    ...curTheme,
                    borderRadius: 10,
                  }
                }}
              />
            </div>

            <Flexbox flexDirection="column" alignItems="flex-start">
              <TextInput title="Point" placeholder="Bonus or Minus" onChange={handleBonusChange} />
              <TextCurrentBalance>Current balance: {newPoints} point </TextCurrentBalance>
            </Flexbox>
          </Flexbox>

          <TextArea
            title="Reason"
            placeholder="Please insert the reason here..."
            value={reason}
            onChange={handleReasonChange}
          />
          <UpdateButton onClick={UpdateAttend}>Update</UpdateButton>
        </Flexbox>
      )}
    </Wrapper>
  )
}
export default SelectionInput
