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
export const StyledModalTitle = styled.h4`
  font-size: 2.35rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 10px;
  @media (max-width: 375px) {
    font-size: 1.5rem;
  }
`
export const SubHeading = styled.h4`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: ${(props) => props.fontSize || 1.2}rem;
  color: ${theme.low_contrast};
  line-height: 17px;
`
export const StyledStatusTitle = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 36px;
  // text-align: center;
  color: ${theme.cyan1};
`
export const StyledStatusWarning = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 36px;
  // text-align: center;
  color: ${theme.yellow1};
`
