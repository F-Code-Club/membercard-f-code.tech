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
  transition: all 0.2s;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12),
    0px 1px 3px rgba(0, 0, 0, 0.2);
`
const StyledUpdateButton = styled(BaseButton)`
  margin-top: 10px;
  color: ${theme.plum};
  background-color: ${theme.cyan1};
  transition: all 0.2s;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12),
    0px 1px 3px rgba(0, 0, 0, 0.2);
  padding: 0.5rem 2rem;
  width: 40%;
`
export { StyledBlueButton, StyledGreenButton, StyledRedButton, StyledUpdateButton }
