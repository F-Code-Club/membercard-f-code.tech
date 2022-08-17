import simpleDateFormat from './SimpleDateFormat'

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

export const convertStringToTime = (time, date) => {
  let result = null
  if (!time) return result

  result = date || new Date()
  const splitter = time.split(':')
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
    day: date.getDate(),
    month: months[date.getMonth()],
    year: date.getFullYear(),
  }

  return `${hasWeekday ? dateTime.weekDay + ', ' : ''}${hasMonth ? dateTime.month + ' ' : ''}${
    hasDate ? dateTime.day + ' ' : ''
  }${hasYear ? dateTime.year : ''}`
}

/**
 * Format upcoming date time
 * @param {Date} start the start date
 * @param {Date} end the end date
 * @returns {string} a string representing the date time
 */
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

/**
 * Add leading zero to time value if needed.
 * @param {number} time the time value
 * @returns {string} a string representing the time value
 */
export const leadingZero = (time) => {
  return time < 10 ? '0' + time : time
}

/**
 * Compare two dates. If arguments are illegal, return NaN
 * @param {Date} first the first date to be compared
 * @param {Date} second the second date to be compared
 * @returns {number} a number (-1, 0, 1) represents for less than, equal and greater than, respectively
 */
export const compareDate = (first, second) => {
  if (first == null || second == null) return NaN

  const tempFirst = new Date(first)
  const tempSecond = new Date(second)
  tempFirst.setHours(0, 0, 0, 0)
  tempSecond.setHours(0, 0, 0, 0)

  if (tempFirst.getTime() === tempSecond.getTime()) {
    return 0
  } else if (tempFirst.getTime() < tempSecond.getTime()) {
    return -1
  } else {
    return 1
  }
}

/**
 * Generate String-type time value.
 * @param {Date} time object containing time value
 * @returns formatted time according to the pattern 'HH:MM:SS'
 */
export const formatTime = (time) => {
  if (!time) return '00:00:00'

  const hours = leadingZero(convertStringToTime(time).getHours())
  const minutes = leadingZero(convertStringToTime(time).getMinutes())
  const seconds = leadingZero(convertStringToTime(time).getSeconds())

  return `${hours}:${minutes}:${seconds}`
}

export const formatTimeByPattern = (date, pattern) => {
  let dateFormatter = new simpleDateFormat()
  dateFormatter.applyPattern(pattern)
  return dateFormatter.format(date)
}
