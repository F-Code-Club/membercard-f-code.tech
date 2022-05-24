import styled from 'styled-components';

const StyledFlexbox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  flex-direction: ${(props) => props.flexDirection};
  gap: ${(props) => props.gap};
`;

export {StyledFlexbox};