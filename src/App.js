import './index.css';
import {
  Button,
  CloseButton,
  RedButton,
  BlueButton,
  GreenButton,
  CreateButton,
} from './components/Button';
import Wrapper from './components/Wrapper';
import StyledIcon from './components/Icon';
import Flexbox from './components/Flexbox';
import Icon from './components/Icon';
import Divider from './components/Divider';
import Modal from './components/Modal';
import { DateInput } from './components/Input';
import { useState } from 'react';
import DatePicker from 'sassy-datepicker';

const onChange = (date) => {
  console.log(date);
};

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="App">
      <Flexbox alignItems="center" justifyContent="center">
        <Wrapper>
          {/* <Flexbox gap="5px" flexDirection="column">
            <Button>
              <Flexbox gap="5px" alignItems="center">
                Sign in with Google account
                <StyledIcon name="arrow-forward"></StyledIcon>
              </Flexbox>
            </Button>
            <Divider variant="dashed" />
            <Flexbox gap="10px" justifyContent="space-between">
              <BlueButton fullWidth={true} onClick={() => setShowModal(true)}>
                Start Now
              </BlueButton>
              <RedButton fullWidth={true}>End Now</RedButton>
            </Flexbox>
            <Divider />
            <GreenButton fullWidth={true}>Check In</GreenButton>
            <CreateButton fullWidth={true}>
              <Icon name="add" weight={4}></Icon>
              Create new event
            </CreateButton>
            <Modal title="Create new event" show={showModal} onClose={() => setShowModal(false)}>Something in here</Modal>
          </Flexbox> */}
          {/* <DatePicker onChange={onChange}/> */}
          <DatePicker onChange={onChange}/>
        </Wrapper>
      </Flexbox>
    </div>
  );
}

export default App;
