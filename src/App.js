import { Button, CloseButton, BlueButton } from './components/Button';
import Container from './components/Container';
import StyledIcon from './components/Icon';
import Flexbox from './components/Flexbox';

function App() {
  return (
    <div className="App">
      <Flexbox alignItems="center" justifyContent="center">
        <Container>
          <Button>
            <Flexbox gap="5px" alignItems="center">
              Sign in with Google account
              <StyledIcon name="arrow-forward"></StyledIcon>
            </Flexbox>
          </Button>
          <CloseButton size={2} onClick={() => alert('Omg')}></CloseButton>
          <BlueButton>Start Now</BlueButton>
        </Container>
      </Flexbox>
    </div>
  );
}

export default App;
