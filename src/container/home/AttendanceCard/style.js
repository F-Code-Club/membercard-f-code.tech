import styled from 'styled-components'

import theme from './../../../theme'

export const StyledImage = styled.img`
  width: 42%;
  height: 50%;
  object-fit: contain;
  flex-grow: 1;
  background-color: ${theme.state4};
`

export const StyledCardTitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 2.1em;
  font-weight: 700;
  color: ${theme.low_contrast};
  line-height: 48px;
  letter-spacing: 0em;
  text-align: center;
`
