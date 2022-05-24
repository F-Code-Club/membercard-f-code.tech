import styled from 'styled-components'

const parseCSS = (rules) => {
  let result = ''
  for (let key in rules) {
    result = result + key + ': ' + rules[key] + ';\n'
  }
  return result
}

const StyledIcon = styled.div`
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.size || 'inherit'};
  ${(props) => (props.style ? parseCSS(props.style) : '')}

  & > ion-icon {
    font-size: inherit;
    --ionicon-stroke-width: ${(props) => (props.weight ? props.weight + 'em' : '16px')};
  }
`

const Icon = (props) => {
  const { name, ...rest } = props
  return (
    <StyledIcon {...rest}>
      <ion-icon name={name}></ion-icon>
    </StyledIcon>
  )
}

export default Icon
