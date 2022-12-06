import React, { useState } from 'react'

import { Button } from '../../../components/Button'
import Divider from '../../../components/Divider'
import Modal from '../../../components/Modal'
import Wrapper from '../../../components/Wrapper'
import Flexbox from './../../../components/Flexbox'

// import TextArea from './../../../components/Input/TextArea'
import CardSvg from './../../../asset/image/Card.svg'
// import { cardReader } from './../../../utils/CardReader'
import { StyledCardTitle, StyledImage } from './style'

const AttendanceCard = (props) => {
  const { data, onClose, openViewList } = props
  const [cardReader, setCardReader] = useState({
    log: '',
    status: '',
  })
  // window.addEventListener('error', function (error) {
  //   if (cardReader && cardReader.status) {
  //     console.error(error)
  //     cardReader.setStatus(error.message + ' (Your browser may not support this feature.)')
  //     error.preventDefault()
  //   }
  // })
  const onScan = async () => {
    // setCardReader({
    //   log: 'Start Scanning',
    //   status: null,
    // })
    // console.log('Scanning')
    // try {
    //   if (!('NDEFReader' in window)) {
    //     throw new Error('NDEFReader is not available, use Chrome on Android')
    //   }
    //   const ndef = new NDEFReader()
    //   await ndef.scan()
    //   ndef.addEventListener('readingerror', () => {
    //     log('Argh! Cannot read data from the NFC tag. Try another one?')
    //   })
    //   ndef.addEventListener('reading', ({ message, serialNumber }) => {
    //     setCardReader({
    //       log: `> Serial Number: ${serialNumber} > Records: (${message.records.length})`,
    //       status: '',
    //     })
    //   })
    // } catch (error) {
    //   setCardReader({ log: 'Argh! ' + error, status: error.message })
    // }
  }

  // useEffect(() => {
  //   // if (/Chrome\/(\d+\.\d+.\d+.\d+)/.test(navigator.userAgent)) {
  //   //   // Let's log a warning if the sample is not supposed to execute on this
  //   //   // version of Chrome.
  //   //   if (89 > parseInt(RegExp.$1)) {
  //   //     setCardReader({
  //   //       log: '',
  //   //       status: 'warning your browser my not supported',
  //   //     })
  //   //   }
  //   // }
  //   // onScan()
  // }, [])
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
      {/* <TextArea value={cardReader.log}></TextArea> */}
      <Button onClick={openViewList}>View List</Button>
    </Modal>
  )
}

export default AttendanceCard
