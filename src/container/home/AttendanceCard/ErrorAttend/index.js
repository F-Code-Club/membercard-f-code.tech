import React from 'react'

import { ErrorButton } from '../../../../components/Button/ErrorButton'
// import Wrapper from '../../../../components/Wrapper'
import { WarningButton } from '../../../../components/Button/FixedButtonWarning'
import Flexbox from '../../../../components/Flexbox'
// import Modal from '../../../../components/Modal'
import AttendanceModalAlert from '../../../../components/Modal/AttendanceModalAlert'

import { StyledStatusWarning, SubHeading2, StyledStatusError } from '../style'

const ErrorAttendance = (props) => {
  const { user, errors, onClose } = props

  return (
    <AttendanceModalAlert show={errors.show} onClose={onClose}>
      {user && (
        <Flexbox justifyContent="center" flexDirection="column" alignItems="center">
          {errors.status === 'error' ? <ErrorButton /> : <WarningButton />}
          {errors.status === 'error' ? (
            <StyledStatusError>Error</StyledStatusError>
          ) : (
            <StyledStatusWarning>Warning</StyledStatusWarning>
          )}
          <SubHeading2>{errors.errors}</SubHeading2>
        </Flexbox>
      )}
    </AttendanceModalAlert>
  )
}

export default ErrorAttendance
