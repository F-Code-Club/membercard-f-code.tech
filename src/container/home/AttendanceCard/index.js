import React from 'react'

import { Button } from '../../../components/Button'
import Divider from '../../../components/Divider'
import Modal from '../../../components/Modal'
import Wrapper from '../../../components/Wrapper'
import Flexbox from './../../../components/Flexbox'

import CardSvg from './../../../asset/image/Card.svg'
import { StyledCardTitle, StyledImage } from './style'

const AttendanceCard = (props) => {
  const { data, onClose, openViewList } = props

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
      <Button onClick={openViewList}>View List</Button>
    </Modal>
  )
}

export default AttendanceCard
