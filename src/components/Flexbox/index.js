import styled from 'styled-components';

const FlexboxWrapper = (Component, props) => {
  const { children, ...rest } = props;
  return <Component {...rest}>{children}</Component>;
};

const StyledComponent = styled.div`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  flex-direction: ${(props) => props.flexDirection};
  gap: ${(props) => props.gap};
`;

const Flexbox = (props) => FlexboxWrapper(StyledComponent, props);

export default Flexbox;
