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
  const { hashId, setHashId, eventId, user, setUser } = useContext(UserContext)
  const token = LocalStorageUtils.getToken()
  //, openViewList
  const { data, onClose, openViewList, event } = props
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
    // setCardReader({
    //   log: 'Start Scanning',
    //   status: null,
    //   isLoading: false,
    // })

    console.log('Scanning')
    const arrayBufferToString = (buffer, encoding) => {
      var blob = new Blob([buffer], { type: 'text/plain' })
      var reader = new FileReader()
      reader.onload = async function (evt) {
        const Id = evt.target.result.split('=')
        await fetchUserByID(Id[1]).then(async (user) => {
          setUser(user)
          await CheckAttendance(user, Id[1]).then((res) => {
            if (res) {
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
      ndef.addEventListener('readingerror', () => {
        log('Argh! Cannot read data from the NFC tag. Try another one?')
      })
      ndef.addEventListener('reading', ({ message }) => {
        arrayBufferToString(message.records[0].data.buffer, 'UTF-8')
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

    onScan()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchUserByID = async (cardReader) => {
    return await productApi.getUser(cardReader, token).then((res) => {
      console.log('line 119')
      return res.data.data
    })
    // console.log('line 117: ', userID.data.data)
  }
  const CheckAttendance = async (user, Id) => {
    console.log('check run')
    const TimeNow = `${leadingZero(new Date().getHours())}:${leadingZero(
      new Date().getMinutes()
    )}:00`

    const TimeLate = `${leadingZero(new Date().getHours())}:${leadingZero(
      new Date().getMinutes() + 5
    )}:00`
    // split the time
    // convert timestamp
    console.log('line 140: ', TimeLate)
    console.log('line 141: ', TimeNow)
    console.log('line 142: ', event.start_time)
    console.log('line 143: ', event.start_time <= TimeNow)
    if (user.id === Id) {
      const result = await productApi.setAttendance(user.id, event.id, 'attended', token)
      if (result.data.status === 200 && compareDate(new Date(event.start_date), new Date()) === 0) {
        console.log('correct date')
        if (event.start_time <= TimeNow && TimeNow <= TimeLate) {
          console.log('present')
          return {
            show: true,
            status: 'present',
          }
        }
        if (event.start_time <= TimeNow && TimeNow <= TimeLate) {
          return { show: true, status: 'late' }
        }
      }
      if (result.data.status === 400) {
        console.log(result.data.message)
      }
    } else {
      console.log(`user with ${cardReader.log} is not in the database`)
    }

    return null
  }
  // if (alertAttend.status === 'present' || alertAttend.status === 'late') {
  //   setCardReader({ isLoading: false })
  // }

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
