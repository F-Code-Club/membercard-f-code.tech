export const WEEKDAYS_LONG = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]
export const WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const MONTHS_LONG = [
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
export const MONTHS_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
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
  { useShortDate = false, hasWeekday = true, hasDate = true, hasMonth = true, hasYear = true } = {}
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

  const weekdays = useShortDate ? WEEKDAYS_SHORT : WEEKDAYS_LONG
  const months = useShortDate ? MONTHS_SHORT : MONTHS_LONG

  const dateTime = {
    weekDay: weekdays[date.getDay()],
    day: formatDateOrdinal(date.getDate()),
    month: months[date.getMonth()],
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
    return `${formatDate(start, {
      useShortDate: true,
      hasWeekday: false,
      hasYear: false,
    })} (${leadingZero(startHour)}:${leadingZero(startMinute)} - ${leadingZero(
      endHour
    )}:${leadingZero(endMinute)})`
  } else {
    return `${formatDate(start, {
      useShortDate: true,
      hasWeekday: false,
      hasYear: false,
    })} - ${formatDate(end, {
      useShortDate: true,
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

/**
 * Compare two dates. If arguments are illegal, return NaN
 * @param {Date} first the first date to be compared
 * @param {Date} second the second date to be compared
 * @returns a number (-1, 0, 1) represents for less than, equal and greater than, respectively
 */
export const compareDate = (first, second) => {
  if (first == null || second == null) return NaN

  first.setHours(0, 0, 0, 0)
  second.setHours(0, 0, 0, 0)

  if (first.getTime() === second.getTime()) {
    return 0
  } else if (first.getTime() < second.getTime()) {
    return -1
  } else {
    return 1
  }
}

export const formatTime = (time) => {
  const hours = leadingZero(convertStringToTime(time).getHours())
  const minutes = leadingZero(convertStringToTime(time).getMinutes())

  return hours + ':' + minutes
}
