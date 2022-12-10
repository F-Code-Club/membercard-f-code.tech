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

const StyledCheckMarkButton = styled(BaseButton)`
  padding: 1em;
  background-color: ${theme.cyan2};
  color: ${theme.cyan1};
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

const CheckMarkButton = (props) => {
  return (
    <StyledCheckMarkButton {...props}>
      <ion-icon name="checkmark-outline"></ion-icon>
    </StyledCheckMarkButton>
  )
}

export { CheckMarkButton }
