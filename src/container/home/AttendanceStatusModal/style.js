import styled from 'styled-components'

import Wrapper from './../../../components/Wrapper/index'

import theme from './../../../theme'

export const StyledWrapper = styled(Wrapper)`
  padding: 6px 13px;
  cursor: pointer;
  border-radius: 10px;

  &:hover {
    background-color: ${theme.slate3};
  }
`

export const Heading = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: ${theme.high_contrast};
  line-height: 24px;
`
export const SubHeading = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: ${(props) => props.fontSize || 12}px;
  color: ${theme.low_contrast};
  line-height: 17px;
`
export const StatusBadge = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: ${(props) => props.textColor};
  line-height: 15px;
  text-transform: capitalize;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80px;
  min-width: 80px;

  height: 25px;
  border-radius: 5px;
  background-color: ${(props) => props.color};
  padding: 0.25rem 0.5rem;
`
