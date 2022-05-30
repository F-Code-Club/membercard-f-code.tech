const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const formatDate = (
  date,
  { weekday = true, day = true, month = true, year = true } = {}
) => {
  if (!date) {
    return ''
  }

  const formatDay = (day) => {
    if (day < 1 || day > 32) return undefined

    const lastDigit = day % 10
    switch (lastDigit) {
      case '1':
        return `${day}st`
      case '2':
        return `${day}nd`
      case '3':
        return `${day}rd`
      default:
        return `${day}th`
    }
  }

  const dateTime = {
    weekDay: WEEKDAYS[date.getDay()],
    day: formatDay(date.getDate()),
    month: MONTHS[date.getMonth()],
    year: date.getFullYear(),
  }

  return `${weekday ? dateTime.weekDay + ', ' : ''}${month ? dateTime.month + ' ' : ''}${
    day ? dateTime.day + ' ' : ''
  }${year ? dateTime.year : ''}`
}

export const useCSS = (rules) => {
  let result = ''
  for (let key in rules) {
    result = result + key + ': ' + rules[key] + ';\n'
  }
  return result
}
