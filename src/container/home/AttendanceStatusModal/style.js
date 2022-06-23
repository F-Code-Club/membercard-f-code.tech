import styled from 'styled-components'

import Wrapper from './../../../components/Wrapper/index'

import theme from './../../../theme'

export const StyledWrapper = styled(Wrapper)`
  padding: 6px 13px;

  :hover {
    background-color: ${theme.state3};
  }
`

export const Heading = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: ${theme.high_contrast};
  line-height: 24px;
`
export const SubHeading = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: ${theme.low_contrast};
  line-height: 17px;
`
