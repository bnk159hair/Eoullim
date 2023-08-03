import { useNavigate } from 'react-router-dom';
import Loading from '../../components/stream/Loading';
import { useOpenVidu } from '../../hooks/useOpenVidu';
import { CanvasTag } from '../../components/stream/CanvasTag';
import {
  Buttons,
  Character,
  Container,
  MainWrapper,
  MyVideo,
  SideBar,
  YourVideo,
} from './SessionStyles';

const Session = () => {
  const navigate = useNavigate();

  console.log('오픈비두 시작');
  const userId = 'user01';
  const { publisher, streamList } = useOpenVidu(userId);
  const leaveSession = async () => {
    navigate('/');
  };

  return (
    <Container>
      <MainWrapper>
        {/* {publisher
        ? streamList.map((stream, idx) =>
            stream.streamManager ? (
              <div key={idx} className="stream-container col-md-6 col-xs-6">
                {stream.streamManager === publisher ? <h1>MyVideo</h1> : null}
                {stream.streamManager !== publisher ? (
                  <h1>FriendVideo</h1>
                ) : null}
                <CanvasTag
                  streamManager={stream.streamManager}
                  name={stream.userId}
                  avatarPath="http://localhost:3000/image.png"
                />
              </div>
            ) : null
          )
        : null} */}

        <YourVideo>
          {streamList.length > 1 ? (
            <CanvasTag
              streamManager={streamList[1].streamManager}
              name={streamList[1].userId}
              avatarPath="http://localhost:3000/image.png"
            />
          ) : null}
        </YourVideo>
        {/* <Loading /> */}
      </MainWrapper>
      <SideBar>
        <Character>Character</Character>
        <MyVideo>
          <YourVideo>
            {streamList.length > 1 ? (
              <CanvasTag
                streamManager={streamList[0].streamManager}
                name={streamList[0].userId}
                avatarPath="http://localhost:3000/image.png"
              />
            ) : null}
          </YourVideo>
        </MyVideo>
        <Buttons>
          <button>애니몬</button>
          <button onClick={leaveSession}>나가기</button>
        </Buttons>
      </SideBar>
    </Container>
  );
};

export default Session;
