import React, { useEffect, useState } from 'react'

import Select, { components } from 'react-select'
import styled from 'styled-components'

import { put } from '../../utils/ApiCaller'
import LocalStorageUtils from '../../utils/LocalStorageUtils'
import productApi from '../../utils/productApi'
import { UpdateButton } from '../Button'
import Flexbox from '../Flexbox'
import Wrapper from '../Wrapper'
import theme from './../../theme'
import TextArea from './TextArea'
import TextInputVer2 from './TextInputVe2'

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
const SelectionInput = ({ user, eventId, memberId, onClose, getMember }) => {
  const options = [
    {
      value: 'late',
      label: 'Late',
    },
    {
      value: 'absent',
      label: 'Absent',
    },
    {
      value: 'attended',
      label: 'Attended',
    },
  ]

  const [data, setData] = useState()
  const [bonus, setBonus] = useState(0)
  const handleBonusChange = (newBonus) => {
    setBonus(newBonus)
  }
  const [statusUpdate, setStatusUpdate] = useState('')
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
      date: 'string',
      eventId: 0,
      eventName: 'string',
      id: 0,
      lastName: 'string',
      memberId: 0,
      state: 'LATE',
      studentId: 'string',
    }
    const formatUpdatePoint = {
      date: 'string',
      id: 0,
      memberId: 0,
      quantity: 0,
      reason: 'string',
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

    const resUpdatePoints = await put(
      '/pluspoint',
      formatUpdatePoint,
      {},
      { authorization: token }
    ).catch((err) => console.log(err))

    onClose()
  }
  useEffect(() => {
    const getUserInfo = async () => {
      const token = LocalStorageUtils.getToken()
      const result = await productApi
        .getUser(token)
        .then((result) => {
          return result.data.data
        })
        .catch((err) => console.log(err))
      setData(result)
    }
    getUserInfo()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log('line 109: ', data)
  return (
    <Wrapper>
      {user && data && (
        <Flexbox flexDirection="column" alignItems="flex-end">
          <Flexbox flexDirection="row" justifyContent="space-between" gap="20px">
            <StyledSelectionBox
              options={options}
              onChange={(e) => {
                handleStatusChange(e.value)
              }}
              components={{ Control: StyledControl, IndicatorSeparator: styledIndicatorSeparator }}
              theme={(curTheme) => {
                return {
                  ...curTheme,
                  borderRadius: 10,
                }
              }}
            />
            <Flexbox flexDirection="column" alignItems="flex-start">
              <TextInputVer2 placeholder="Bonus or Minus" onChange={handleBonusChange} />
              <TextCurrentBalance>Current balance: {data.active_point}</TextCurrentBalance>
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
