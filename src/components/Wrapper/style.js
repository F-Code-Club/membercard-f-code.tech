import styled from 'styled-components';

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: ${(props) =>
    props.currentWidth < 500 ? props.currentWidth - 50 : 500}px;
  min-height: ${(props) => props.minHeight || 'auto'};
  margin: 0 auto;
  padding: 0;
`;

export { StyledWrapper };
