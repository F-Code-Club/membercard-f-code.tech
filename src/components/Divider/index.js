import { StyledDivider } from './style'

const Divider = (props) => {
  const { margin, ...rest } = props
  return <StyledDivider margin={margin} {...rest} />
}

export default Divider
