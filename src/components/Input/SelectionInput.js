import React, { useState } from 'react'

import Select, { components } from 'react-select'
import styled from 'styled-components'

import { UpdateButton } from '../Button'
import Flexbox from '../Flexbox'
import Wrapper from '../Wrapper'
import theme from './../../theme'
import TextInputVer2 from './TextInputVe2'

const StyledSelectionBox = styled(Select)``

const StyledControl = styled(components.Control)`
  color: ${theme.low_contrast};
  padding: 1px;
  background-color: ${theme.slate1};
  border-radius: 10px;
`
const styledIndicatorSeparator = styled(components.IndicatorSeparator)`
  display: none;
`
const SelectionInput = ({}) => {
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
  return (
    <Wrapper>
      <Flexbox flexDirection="column" alignItems="flex-end">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <StyledSelectionBox
            options={options}
            onChange={(e) => {
              handleStatusChange(e.label)
            }}
            components={{ Control: StyledControl, IndicatorSeparator: styledIndicatorSeparator }}
            theme={(curTheme) => {
              return {
                ...curTheme,
                borderRadius: 10,
              }
            }}
          />
          <TextInputVer2 placeholder="Bonus or Minus" onChange={handleBonusChange} />
        </div>
        <UpdateButton onClick={() => console.log(statusUpdate)}>Update</UpdateButton>
      </Flexbox>
    </Wrapper>
  )
}
export default SelectionInput
