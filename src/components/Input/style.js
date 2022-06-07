import styled from 'styled-components'

import theme from './../../theme'

const StyledHeading = styled.h4`
  font-family: inherit;
  font-size: ${(props) => props.fontSize || '1.25rem'};
  font-weight: 500;
  color: ${theme.low_contrast};
  margin-bottom: 10px;
`

export { StyledHeading }
