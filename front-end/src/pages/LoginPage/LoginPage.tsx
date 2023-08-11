import Login from "../../components/login/Login";
import {
  LoginPageContainer,
  LoginContainer,
  Logo,
  ImageContainer,
} from "./LoginPageStyles";

const LoginPage = () => {
  return (
    <LoginPageContainer>
      <LoginContainer>
        <Login />
      </LoginContainer>
      <ImageContainer>
        <Logo onClick={() => window.location.reload()} />
      </ImageContainer>
    </LoginPageContainer>
  );
};

export default LoginPage;
