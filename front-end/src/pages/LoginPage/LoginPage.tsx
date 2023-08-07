import Login from '../../components/login/Login';
import { LoginPageContainer, LoginContainer, Logo } from './LoginPageStyles';

const LoginPage = () => {
  return (
    <LoginPageContainer>
      <LoginContainer>
        <Login />
      </LoginContainer>
      <Logo />
    </LoginPageContainer>
  );
};

export default LoginPage;
