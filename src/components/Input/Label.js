import styled from 'styled-components';
import theme from '../../theme';

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: 500;
  font-size: 1.25em;
  color: ${theme.low_contrast};
`;

const Label = (props) => {
  return <StyledLabel>{props.title}</StyledLabel>;
};

export default Label;
