export const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]
export const MONTHS = [
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

export const convertStringToTime = (time) => {
  const splitter = time.split(':')
  let result = new Date()
  result.setHours(splitter[0])
  result.setMinutes(splitter[1])
  result.setSeconds(splitter[2])
  return result
}
export const formatDate = (
  date,
  { hasWeekday = true, hasDate = true, hasMonth = true, hasYear = true } = {}
) => {
  if (!date) {
    return ''
  }

  const formatDateOrdinal = (day) => {
    if (day < 1 || day > 31) return undefined

    const lastDigit = day % 10
    switch (lastDigit) {
      case 1:
        return `${day}st`
      case 2:
        return `${day}nd`
      case 3:
        return `${day}rd`
      default:
        return `${day}th`
    }
  }

  const dateTime = {
    weekDay: WEEKDAYS[date.getDay()],
    day: formatDateOrdinal(date.getDate()),
    month: MONTHS[date.getMonth()],
    year: date.getFullYear(),
  }

  return `${hasWeekday ? dateTime.weekDay + ', ' : ''}${hasMonth ? dateTime.month + ' ' : ''}${
    hasDate ? dateTime.day + ' ' : ''
  }${hasYear ? dateTime.year : ''}`
}

export const formatUpcomingTime = (start, end) => {
  const [startDate, startMonth, startYear, startHour, startMinute] = [
    start.getDate(),
    start.getMonth(),
    start.getFullYear(),
    start.getHours(),
    start.getMinutes(),
  ]
  const [endDate, endMonth, endYear, endHour, endMinute] = [
    end.getDate(),
    end.getMonth(),
    end.getFullYear(),
    end.getHours(),
    end.getMinutes(),
  ]

  if (startDate === endDate && startMonth === endMonth && startYear === endYear) {
    return `${formatDate(start, { hasWeekday: false, hasYear: false })} (${leadingZero(
      startHour
    )}:${leadingZero(startMinute)} - ${leadingZero(endHour)}:${leadingZero(endMinute)})`
  } else {
    return `${formatDate(start, { hasWeekday: false, hasYear: false })} - ${formatDate(end, {
      hasWeekday: false,
      hasYear: false,
    })}`
  }
}

export const useCSS = (rules) => {
  let result = ''
  for (let key in rules) {
    result = result + key + ': ' + rules[key] + ';\n'
  }
  return result
}

export const leadingZero = (time) => {
  return time < 10 ? '0' + time : time
}

export const formatTime = (time) => {
  const hours = leadingZero(convertStringToTime(time).getHours())
  const minutes = leadingZero(convertStringToTime(time).getMinutes())

  return hours + ':' + minutes
}
