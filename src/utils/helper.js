export const useCSS = (rules) => {
  let result = ''
  for (let key in rules) {
    result = result + key + ': ' + rules[key] + ';\n'
  }
  return result
}
