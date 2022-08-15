import React from 'react'

import Select, { components } from 'react-select'
import styled from 'styled-components'

import Wrapper from '../Wrapper'
import theme from './../../theme'

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
  return (
    <Wrapper>
      <StyledSelectionBox
        options={options}
        components={{ Control: StyledControl, IndicatorSeparator: styledIndicatorSeparator }}
        theme={(curTheme) => {
          return {
            ...curTheme,
            borderRadius: 10,
          }
        }}
      />
    </Wrapper>
  )
}
export default SelectionInput
