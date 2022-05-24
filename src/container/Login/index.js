import Flexbox from "../../components/Flexbox";
import Icon from "../../components/Icon";
import {
  Logo,
  LoginWrapper,
  LoginHeading,
  LoginDescription,
  LoginDivider,
  LoginButton,
  LoginCredit,
} from "./style";

export default (props) => {
  return (
    <LoginWrapper minHeight="100vh">
      <Logo size={60} />
      <LoginHeading>
        Welcome to <strong>F-Code.</strong>
      </LoginHeading>
      <LoginDescription>
        A simple platform for event management.
      </LoginDescription>
      <LoginDivider width={120} />
      <LoginButton>
        Sign in with Google account{" "}
        <Icon
          name="arrow-forward"
          style={{
            "margin-left": "5px",
            transform: "translateY(0.5px)",
          }}
        />
      </LoginButton>
      <LoginCredit>
        Designed by <strong>F-Code Team.</strong>
      </LoginCredit>
    </LoginWrapper>
  );
};
