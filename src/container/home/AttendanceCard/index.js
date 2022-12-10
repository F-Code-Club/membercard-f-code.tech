import React, { useState, useContext, useEffect } from 'react'

import { Button } from '../../../components/Button'
import Divider from '../../../components/Divider'
import Modal from '../../../components/Modal'
import Wrapper from '../../../components/Wrapper'
import Flexbox from './../../../components/Flexbox'
import TextArea from './../../../components/Input/TextArea'

import { UserContext } from '../../../utils/IdMemberHashContext/user.context'
import LocalStorageUtils from '../../../utils/LocalStorageUtils'
import { leadingZero } from '../../../utils/helper'
import { compareDate } from '../../../utils/helper'
import productApi from '../../../utils/productApi'
import CardSvg from './../../../asset/image/Card.svg'
import AlertAttendance from './AlertAttendance'
// import { cardReader } from './../../../utils/CardReader'
import { StyledCardTitle, StyledImage } from './style'

const AttendanceCard = (props) => {
  const { hashId, setHashId, user, eventId, setUser } = useContext(UserContext)
  const token = LocalStorageUtils.getToken()
  //, openViewList
  const { data, onClose, openViewList } = props
  const [cardReader, setCardReader] = useState({
    log: 'https://member.f-code.tech/member?id=1297048744daa025a0e0f5a6a3256164',
    status: '',
  })
  //funct handlers
  const [alertAttend, setAlertAttend] = useState({
    show: false,
    status: '',
  })
  // const openViewList = () => {
  //   toggleListAttendance({
  //     show: true,
  //   })
  // }
  const closeAlertModal = () => {
    setHashId({ log: '', status: '' })
    setAlertAttend({
      show: false,
      status: '',
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
    setCardReader({
      log: 'Start Scanning',
      status: null,
    })

    console.log('Scanning')
    const arrayBufferToString = (buffer, encoding) => {
      var blob = new Blob([buffer], { type: 'text/plain' })
      var reader = new FileReader()
      reader.onload = function (evt) {
        const Id = evt.target.result.split('=')
        console.log(Id[1])
        setCardReader({ log: `${Id[1]}`, status: '' })
      }
      reader.readAsText(blob, encoding)
    }
    try {
      if (!('NDEFReader' in window)) {
        throw new Error('NDEFReader is not available, use Chrome on Android')
      }
      const ndef = new NDEFReader()
      await ndef.scan()
      ndef.addEventListener('readingerror', () => {
        log('Argh! Cannot read data from the NFC tag. Try another one?')
      })
      ndef.addEventListener('reading', ({ message }) => {
        arrayBufferToString(message.records[0].data.buffer, 'UTF-8')
      })
    } catch (error) {
      setCardReader({ log: 'Argh! ' + error, status: error.message })
    }
  }

  const CheckAttendance = async () => {
    const TimeNow = `${leadingZero(new Date().getHours())}:${leadingZero(
      new Date().getMinutes()
    )}:00`

    const TimeLate = `${leadingZero(new Date().getHours())}:${leadingZero(
      new Date().getMinutes() + 5
    )}:00`

    if (user.id === hashId.log) {
      const result = await productApi.setAttendance(user.member_id, eventId.id, 'attended', token)
      if (
        result.data.status === 200 &&
        compareDate(new Date(eventId.start_date), new Date()) === 0
      ) {
        console.log('correct date')

        if (eventId.start_time >= TimeNow && eventId.start_time <= TimeLate) {
          setAlertAttend({ show: true, status: 'present' })
          console.log('present')
        } else {
          setAlertAttend({ show: true, status: 'late' })
          console.log('you are late')
        }
      }
      if (result.data.status === 400) {
        console.log(result.data.message)
      }
    } else {
      console.log(`user with ${hashId.log} is not in the database`)
    }
  }
  const fethcUserByID = async () => {
    const userID = await productApi.getUser(hashId.log, token)
    await setUser(userID.data.data)
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

    onScan()
  }, [])
  fethcUserByID()
  CheckAttendance()
  setHashId(cardReader)
  console.log(hashId)
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
      <TextArea value={cardReader.log}></TextArea>
      <Button onClick={openViewList}>View List</Button>
      <AlertAttendance
        user={user}
        show={alertAttend.show}
        onClose={closeAlertModal}
        status={alertAttend.status}
      />
    </Modal>
  )
}

export default AttendanceCard
