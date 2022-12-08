import React, { useState } from 'react'

import Select, { components } from 'react-select'
import styled from 'styled-components'

import { put } from '../../utils/ApiCaller'
import LocalStorageUtils from '../../utils/LocalStorageUtils'
import { UpdateButton } from '../Button'
import Flexbox from '../Flexbox'
import Wrapper from '../Wrapper'
import theme from './../../theme'
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
const SelectionInput = ({ eventId, memberId, onClose }) => {
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
    {
      value: 'not yet',
      label: 'Not yet',
    },
  ]
  const [bonus, setBonus] = useState(0)
  const handleBonusChange = (newBonus) => {
    console.log(newBonus)
    setBonus(newBonus)
  }
  const [statusUpdate, setStatusUpdate] = useState('')
  const handleStatusChange = (newStatus) => {
    setStatusUpdate(newStatus)
  }

  const UpdateAttend = async () => {
    const token = LocalStorageUtils.getToken()
    const resUpdateAttend = await put(
      '/api/check-attendance',
      { member_id: memberId, event_id: eventId, status: statusUpdate },
      {},
      { token: token }
    ).catch((err) => console.log(err))
    const resUpdatePoints = await put(
      '/api/user/' + memberId + '/change-point',
      { points: bonus },
      {},
      { token: token }
    ).catch((err) => console.log(err))
    onClose()
  }

  return (
    <Wrapper>
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
            <TextCurrentBalance>Current balance: 0</TextCurrentBalance>
          </Flexbox>
        </Flexbox>

        <UpdateButton onClick={UpdateAttend}>Update</UpdateButton>
      </Flexbox>
    </Wrapper>
  )
}
export default SelectionInput
