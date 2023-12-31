import styled from 'styled-components'

import theme from '../../theme'

const StyledLabel = styled.label`
  display: inline-block;
  margin-bottom: 5px;
  font-weight: 600;
  font-size: 1em;
  color: ${theme.low_contrast};
`

const Label = (props) => {
  return <StyledLabel>{props.title}</StyledLabel>
}

export default Label
