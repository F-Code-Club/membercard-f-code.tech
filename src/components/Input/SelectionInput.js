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
const SelectionInput = ({ user, eventId, memberId, onClose }) => {
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

  const [data, setData] = useState()
  const [bonus, setBonus] = useState(0)
  const handleBonusChange = (newBonus) => {
    setBonus(newBonus)
  }
  const [statusUpdate, setStatusUpdate] = useState('')
  const handleStatusChange = (newStatus) => {
    setStatusUpdate(newStatus)
  }

  const UpdateAttend = async () => {
    var md5 = require('md5')
    const token = LocalStorageUtils.getToken()
    const resUpdateAttend = await put(
      '/api/check-attendance',
      { member_id: md5(`${memberId}`), event_id: eventId, status: statusUpdate },
      {},
      { token: token }
    ).catch((err) => console.log(err))
    const resUpdatePoints = await put(
      '/api/user/' + md5(`${memberId}`) + '/change-point',
      { points: bonus },
      {},
      { token: token }
    ).catch((err) => console.log(err))
    console.log('line 84 ', resUpdatePoints)
    console.log('line 85 ', resUpdateAttend)

    onClose()
  }
  useEffect(() => {
    console.log('running')
    const getUserInfo = async () => {
      console.log('running 2 ')
      var md5 = require('md5')
      const token = LocalStorageUtils.getToken()
      const result = await productApi
        .getUser(md5(`${user.member_id}`), token)
        .then((result) => {
          return result.data.data
        })
        .catch((err) => console.log(err))
      console.log(result)
      setData(result)
    }
    getUserInfo()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log('line 107: ', user)
  console.log(data)
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

          <UpdateButton onClick={UpdateAttend}>Update</UpdateButton>
        </Flexbox>
      )}
    </Wrapper>
  )
}
export default SelectionInput
