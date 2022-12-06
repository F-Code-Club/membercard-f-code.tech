import styled from 'styled-components'

import theme from './../../../theme'

export const SubHeading = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: ${(props) => props.fontSize || 1.2}rem;
  color: ${theme.low_contrast};
  line-height: 17px;
`
