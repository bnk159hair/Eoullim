import Signup from '../../components/signup/Signup';
import { SignupPageContainer, SignupContainer } from './SignupPageStyles';

const SignupPage = () => {
  return (
    <SignupPageContainer>
      <div>회원가입</div>
      <br />
      <SignupContainer>
        <Signup />
      </SignupContainer>
    </SignupPageContainer>
  );
};

export default SignupPage;
