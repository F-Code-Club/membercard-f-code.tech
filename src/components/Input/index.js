import DatePicker from './DatePicker'
import { StyledHeading } from './style'

const DateInput = (props) => {
  return (
    <div>
      <StyledHeading>{props.title}</StyledHeading>
      <DatePicker />
    </div>
  )
}

export { DateInput }
