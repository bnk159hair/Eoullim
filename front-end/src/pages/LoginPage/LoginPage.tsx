import Login from "../../components/login/Login";
import {
  LoginPageContainer,
  LoginContainer,
  Logo,
  ImageContainer,
  Animals,
} from "./LoginPageStyles";

const LoginPage = () => {
  return (
    <LoginPageContainer>
      <LoginContainer>
        <Login />
      </LoginContainer>
      <ImageContainer>
        <Logo onClick={() => window.location.reload()} />
        <Animals />
      </ImageContainer>
    </LoginPageContainer>
  );
};

export default LoginPage;
