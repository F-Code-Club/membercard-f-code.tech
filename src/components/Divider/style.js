import styled from "styled-components";
import theme from "./../../theme";

const StyledDivider = styled.hr`
  height: 1.25px;
  width: ${(props) => (props.width ? props.width + "px" : "100%")};
  background-image: linear-gradient(
    90deg,
    ${theme.slate4},
    ${theme.slate4} 75%,
    transparent 75%,
    transparent 100%
  );
  background-size: ${(props) =>
      props.variant === "dashed" ? "0.5em" : "999em"}
    1.25px;
  border: none;
`;

export { StyledDivider };
