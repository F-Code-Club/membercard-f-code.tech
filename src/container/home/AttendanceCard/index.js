import React, { useState, useContext, useEffect } from 'react'

import { ButtonNew } from '../../../components/Button'
import Divider from '../../../components/Divider'
import Modal from '../../../components/Modal'
import { toastError } from '../../../components/ToastNotification'
import Wrapper from '../../../components/Wrapper'
import Flexbox from './../../../components/Flexbox'
import TextArea from './../../../components/Input/TextArea'

import { post } from '../../../utils/ApiCaller'
import { UserContext } from '../../../utils/IdMemberHashContext/user.context'
import LocalStorageUtils from '../../../utils/LocalStorageUtils'
import { leadingZero, formatTimeLate, compareDate, formatTimeForApi } from '../../../utils/helper'
import productApi from '../../../utils/productApi'
import CardSvg from './../../../asset/image/Card.svg'
import AlertAttendance from './AlertAttendance'
import ErrorAttendance from './ErrorAttend'
import { StyledCardTitle, StyledImage } from './style'

const AttendanceCard = (props) => {
  const { user, setUser } = useContext(UserContext)

  const token = LocalStorageUtils.getToken()
  //, openViewList
  const { data, onClose, openViewList, event, getAllMembers } = props
  const [cardReader, setCardReader] = useState({
    log: '',
    status: '',
    isLoading: false,
  })
  //funct handlers
  const [alertAttend, setAlertAttend] = useState({
    show: false,
    status: '',
  })
  const [errors, setErrors] = useState({ show: false, errors: '', status: '' })
  // const openViewList = () => {
  //   toggleListAttendance({
  //     show: true,
  //   })
  // }
  const closeAlertModal = () => {
    setErrors({
      show: false,
      errors: '',
    })
    setAlertAttend({
      show: false,
      status: '',
      isLoading: false,
    })
  }

  // 1297048744daa025a0e0f5a6a3256164
  window.addEventListener('error', function (error) {
    if (cardReader && cardReader.status) {
      console.error(error)
      setCardReader({
        log: error.message + ' (Your browser may not support this feature.)',
      })
      error.preventDefault()
    }
  })
  const onScan = async () => {
    console.log('Scanning')
    const arrayBufferToString = (buffer, encoding) => {
      var blob = new Blob([buffer], { type: 'text/plain' })
      var reader = new FileReader()
      reader.onload = async function (evt) {
        const Id = evt.target.result.split('=')
        console.log('line 72: ', Id)
        await fetchUserByID(Id[1]).then(async (user) => {
          setUser(user)
          await CheckAttendance(user, Id[1]).then((res) => {
            if (res) {
              const formatPlusPoint = {
                date: event.startTime,
                memberId: user.id,
                quantity: event.point,
                reason: `plus for ${event.name} `,
              }
              const resUpdatePoints = post(
                '/pluspoint/new',
                formatPlusPoint,
                {},
                { authorization: token }
              ).catch((err) => console.log(err))
              getAllMembers()
              setAlertAttend(res)
            }
          })
        })

        setCardReader({ log: `${Id[1]}`, status: '', isLoading: true })
      }
      reader.readAsText(blob, encoding)
    }
    try {
      if (!('NDEFReader' in window)) {
        throw new Error('NDEFReader is not available, use Chrome on Android')
      }
      const ndef = new NDEFReader()
      await ndef.scan()
      ndef.addEventListener('readingError', () => {
        console.log('Argh! Cannot read data from the NFC tag. Try another one?')
      })
      ndef.addEventListener('reading', ({ message }) => {
        if (message.records[0].data == null) {
          toastError('data is null')
        } else arrayBufferToString(message.records[0].data.buffer, 'UTF-8')
      })
    } catch (error) {
      setCardReader({ log: 'Argh! ' + error, status: error.message, isLoading: false })
    }
  }

  useEffect(() => {
    if (/Chrome\/(\d+\.\d+.\d+.\d+)/.test(navigator.userAgent)) {
      // Let's log a warning if the sample is not supposed to execute on this
      // version of Chrome.
      if (89 > parseInt(RegExp.$1)) {
        setCardReader({
          log: '',
          status: 'warning your browser my not supported',
        })
      }
    }

    if (data.show) {
      onScan()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.show])

  const fetchUserByID = async (studentId) => {
    return await productApi.getMemberByStudentId(studentId, token).then((res) => {
      console.log('check user: ', res)
      return res.data.data
    })
  }
  const CheckAttendance = async (user, Id) => {
    console.log('check run')
    const TimeNow = `${leadingZero(new Date().getHours())}:${leadingZero(
      new Date().getMinutes()
    )}:00`

    const TimeLate = formatTimeLate(event.startTime)

    if (user.studentId === Id) {
      if (compareDate(new Date(event.startTime), new Date()) === 0) {
        console.log('correct date')
        if (formatTimeForApi(event.startTime) <= TimeNow && TimeNow <= TimeLate) {
          console.log('present')
          const formatAttendance = {
            date: event.startTime,
            eventId: event.id,
            eventName: event.name,
            lastName: user.lastName,
            memberId: user.id,
            state: 'ON_TIME',
            studentId: user.studentId,
          }
          const result = await productApi.setAttendance(formatAttendance, token)
          console.log('line 163: ', result)
          if (result.data.code === 400) {
            setErrors({ show: true, errors: result.data.message, status: 'warning' })
            return {
              show: false,
              status: '',
            }
          }
          return {
            show: true,
            status: 'present',
          }
        } else {
          const formatAttendance = {
            date: event.startTime,
            eventId: event.id,
            eventName: event.name,
            lastName: user.lastName,
            memberId: user.id,
            state: 'LATE',
            studentId: user.studentId,
          }
          const result = await productApi.setAttendance(formatAttendance, token)

          if (result.data.code === 400) {
            setErrors({ show: true, errors: result.data.message, status: 'warning' })
            return {
              show: false,
              status: '',
            }
          }
          return { show: true, status: 'late' }
        }
      }
    } else {
      toastError(`user with ${Id} is not in the database`)
    }
    return null
  }

  return (
    <Modal show={data.show} title="Check Attendance" onClose={onClose}>
      <Wrapper minHeight="450px">
        <Flexbox
          style={{
            height: '400px',
          }}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <StyledImage src={CardSvg} alt="put Member Card here" />
          <StyledCardTitle>Scan your card to continue</StyledCardTitle>
        </Flexbox>
      </Wrapper>
      <Divider variant="dashed" />
      <TextArea margin-bottom="10px" value={cardReader.log}></TextArea>
      <ButtonNew onClick={openViewList}>View List</ButtonNew>
      <AlertAttendance
        user={user}
        show={alertAttend.show}
        onClose={closeAlertModal}
        status={alertAttend.status}
      />
      <ErrorAttendance user={user} errors={errors} onClose={closeAlertModal} />
    </Modal>
  )
}

export default AttendanceCard
