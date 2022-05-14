import { StyledHeading } from './style';
import DatePicker from './DatePicker';

const DateInput = (props) => {
  return (
    <div>
      <StyledHeading>{props.title}</StyledHeading>
      <DatePicker />
    </div>
  );
};

export {DateInput};
