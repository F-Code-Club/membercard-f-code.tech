import styled from 'styled-components';
import BaseInputBox from './InputBox';
import theme from '../../theme';
import { useState } from 'react';
import Label from './Label';

const StyledTextInput = styled.input.attrs({
  type: 'text',
})`
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  border: none;
  outline: none;
  background-color: transparent;
  width: 100%;

  &::-webkit-input-placeholder {
    color: ${theme.slate4};
  }
`;

const TextInput = (props) => {
  const [isFocused, setFocused] = useState(false);

  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setFocused(false);
  };

  const { children, ...rest } = props;

  return (
    <div>
      <Label title={children} />
      <BaseInputBox isFocused={isFocused}>
        <StyledTextInput
          onFocus={onFocus}
          onBlur={onBlur}
          name={children}
          placeholder={children}
          {...rest}
        />
      </BaseInputBox>
    </div>
  );
};

export default TextInput;
