import React, { Component } from 'react'

import ReactDOM from 'react-dom'

import './DatePicker.css'

let oneDay = 60 * 60 * 24 * 1000
let todayTimestamp = Date.now() - (Date.now() % oneDay) + new Date().getTimezoneOffset() * 1000 * 60
let inputRef = React.createRef()

export default class DatePicker extends Component {
  state = {
    getMonthDetails: [],
  }

  constructor() {
    super()
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
    this.state = {
      year,
      month,
      selectedDay: todayTimestamp,
      monthDetails: this.getMonthDetails(year, month),
    }
    this.onDateClick = this.onDateClick.bind(this)
    this.renderCalendar = this.renderCalendar.bind(this)
  }

  componentDidMount() {
    window.addEventListener('click', this.addBackdrop)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.addBackdrop)
  }

  addBackdrop = (e) => {
    if (this.state.showDatePicker && !ReactDOM.findDOMNode(this).contains(e.target)) {
      this.showDatePicker(false)
    }
  }

  showDatePicker = (showDatePicker = true) => {
    this.setState({ showDatePicker })
  }

  daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  monthMap = [
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

  getDayDetails = (args) => {
    let date = args.index - args.firstDay
    let day = args.index % 7
    let previousMonth = args.month - 1
    let previousYear = args.year
    if (previousMonth < 0) {
      previousMonth = 11
      previousYear--
    }
    let previousMonthNumberOfDays = this.getNumberOfDays(previousYear, previousMonth)
    let _date = date < 0 ? previousMonthNumberOfDays + date : (date % args.numberOfDays) + 1
    let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0
    let timestamp = new Date(args.year, args.month, _date).getTime()

    return {
      date: _date,
      day,
      month,
      timestamp,
      dayString: this.daysMap[day],
    }
  }

  getNumberOfDays = (year, month) => {
    return 40 - new Date(year, month, 40).getDate()
  }

  getMonthDetails = (year, month) => {
    let firstDay = new Date(year, month).getDay()
    let numberOfDays = this.getNumberOfDays(year, month)
    let monthArray = []
    let rows = 6
    let currentDay = null
    let index = 0
    let cols = 7

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        currentDay = this.getDayDetails({
          index,
          numberOfDays,
          firstDay,
          year,
          month,
        })
        monthArray.push(currentDay)
        index++
      }
    }

    return monthArray
  }

  isCurrentDay = (day) => {
    return day.timestamp === todayTimestamp
  }

  isSelectedDay = (day) => {
    return day.timestamp === this.state.selectedDay
  }

  getDateFromDateString = (dateValue) => {
    let dateData = dateValue.split('-').map((d) => parseInt(d, 10))
    if (dateData.length < 3) {
      return null
    }

    let year = dateData[0]
    let month = dateData[1]
    let date = dateData[2]
    return { year, month, date }
  }

  getMonthString = (month) => this.monthMap[Math.max(Math.min(11, month), 0)] || 'Month'

  getDateStringFromTimestamp = (timestamp) => {
    let dateObject = new Date(timestamp)
    let month = dateObject.getMonth() + 1
    let date = dateObject.getDate()
    return (
      dateObject.getFullYear() +
      '-' +
      (month < 10 ? '0' + month : month) +
      '-' +
      (date < 10 ? '0' + date : date)
    )
  }

  setDate = (dateData) => {
    let selectedDay = new Date(dateData.year, dateData.month - 1, dateData.date).getTime()
    this.setState({ selectedDay })
    if (this.props.onChange) {
      this.props.onChange(selectedDay)
    }
  }

  updateDateFromInput = () => {
    let dateValue = inputRef.current.value
    let dateData = this.getDateFromDateString(dateValue)
    if (dateData !== null) {
      this.setDate(dateData)
      this.setState({
        year: dateData.year,
        month: dateData.month - 1,
        monthDetails: this.getMonthDetails(dateData.year, dateData.month - 1),
      })
    }
  }

  setDateToInput = (timestamp) => {
    let dateString = this.getDateStringFromTimestamp(timestamp)
    inputRef.current.value = dateString
  }

  onDateClick = (day) => {
    this.setState({ selectedDay: day.timestamp }, () => this.setDateToInput(day.timestamp))
    if (this.props.onChange) {
      this.props.onChange(day.timestamp)
    }
  }

  setYear = (offset) => {
    let year = this.state.year
    let month = this.state.month + offset
    if (month === -1) {
      month = 11
      year--
    } else if (month === 12) {
      month = 0
      year++
    }
    this.setState({
      year,
      month,
      monthDetails: this.getMonthDetails(year, month),
    })
  }

  renderCalendar() {
    let days = this.state.monthDetails.map((day, index) => {
      return (
        <div
          className={
            'c-day-container ' +
            (day.month !== 0 ? ' disabled' : '') +
            (this.isCurrentDay(day) ? ' highlight' : '') +
            (this.isSelectedDay(day) ? ' highlight-green' : '')
          }
          key={index}
        >
          <div className="cdc-day">
            <span onClick={() => this.onDateClick(day)}>{day.date}</span>
          </div>
        </div>
      )
    })

    return (
      <div className="c-container">
        <div className="cc-head">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d, i) => (
            <div key={i} className="cch-name">
              {d}
            </div>
          ))}
        </div>
        <div className="cc-body">{days}</div>
      </div>
    )
  }

  render() {
    return (
      <div className="DatePicker">
        <div className="dp-input" onClick={() => this.showDatePicker(true)}>
          <input type="date" onChange={this.updateDateFromInput} ref={inputRef} />
          <ion-icon name="calendar"></ion-icon>
        </div>
        {this.state.showDatePicker ? (
          <div className="dp-container">
            <div className="dpc-head">
              <div className="dpch-button">
                <div className="dpchb-inner" onClick={() => this.setYear(-1)}>
                  {/* <span className="dpchbi-left-arrows"></span> */}
                  <ion-icon name="chevron-back"></ion-icon>
                </div>
              </div>
              {/* <div className="dpch-button">
                <div className="dpchb-inner" onClick={() => this.setMonth(-1)}>
                  <span className="dpchbi-left-arrow"></span>
                </div>
              </div> */}
              <div className="dpch-container">
                <div className="dpchc-year">{this.state.year}</div>
                <div className="dpchc-month">{this.getMonthString(this.state.month)}</div>
              </div>
              {/* <div className="dpch-button">
                <div className="dpchb-inner" onClick={() => this.setMonth(1)}>
                  <span className="dpchbi-right-arrow"></span>
                </div>
              </div> */}
              <div className="dpch-button" onClick={() => this.setYear(1)}>
                <div className="dpchb-inner">
                  {/* <span className="dpchbi-right-arrows"></span> */}
                  <ion-icon name="chevron-forward"></ion-icon>
                </div>
              </div>
            </div>
            <div className="dpc-body">{this.renderCalendar()}</div>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}
