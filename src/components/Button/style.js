import styled from 'styled-components'

import theme from '../../theme'
import { BaseButton } from './BaseButton'

const StyledBlueButton = styled(BaseButton)`
  color: ${theme.indigo3};
  background-color: ${theme.indigo1};
`
const StyledRedButton = styled(BaseButton)`
  color: ${theme.red1};
  background-color: ${theme.red2};
`
const StyledGreenButton = styled(BaseButton)`
  color: ${theme.plum};
  background-color: ${theme.cyan1};
  box-shadow: 1.6px 1.3px 3.7px rgba(0, 0, 0, 0.012), 5.4px 4.5px 12.5px rgba(0, 0, 0, 0.018),
    24px 20px 56px rgba(0, 0, 0, 0.03);
`

export { StyledBlueButton, StyledGreenButton, StyledRedButton }
