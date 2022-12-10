import styled from 'styled-components'

import theme from './../../theme'
import { BaseButton } from './BaseButton'

const parseCSS = (position) => {
  let result = ''
  for (let key in definedPosition[position]) {
    result = result + key + ': ' + definedPosition[position][key] + ';\n'
  }
  return result
}

const StyledWarningButton = styled(BaseButton)`
  padding: 1em;
  background-color: ${theme.yellow2};
  color: ${theme.yellow1};
  border-radius: 999px;
  margin: 10px 0;
  font-size: ${(props) => props.size}rem;
  ${(props) => (props.position ? parseCSS(props.position) : '')}

  & > ion-icon {
    font-size: 40px;
    --ionicon-stroke-width: 60px;
  }
  &:hover {
    opacity: 1;
  }
`

const WarningButton = (props) => {
  return (
    <StyledWarningButton {...props}>
      <ion-icon name="alert-outline"></ion-icon>
    </StyledWarningButton>
  )
}

export { WarningButton }
