import styled from 'styled-components'

import { useCSS } from '../../utils/helper'
import theme from './../../theme'

export const StyledEventWrapper = styled.div`
  position: relative;
  padding: 15px 15px;
  border-radius: 10px;
  font-size: 8px;

  &:active {
    background-color: ${theme.slate1_10};
  }
`

export const StyledEventIndicator = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  ${(props) => useCSS(props.style)}

  background-color: ${(props) => props.indicatorColor};
`

export const StyledEventHeading = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: ${(props) => props.color || 'inherit'};
  text-decoration: ${(props) => props.textDecoration || ''};
`

export const StyledEventDescription = styled.p`
  font-weight: 500;
  color: ${(props) => props.color || theme.low_contrast};

  & > strong {
    font-weight: 600;
  }
`

export const StyledEventStatus = styled.div`
  color: ${(props) => props.indicatorColor};
  font-size: 10px;
  font-weight: 700;
  flex-basis: 20%;
  text-decoration: ${(props) => props.textDecoration || ''};
`
