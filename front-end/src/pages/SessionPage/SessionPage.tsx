import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/stream/Loading';
import { useOpenVidu } from '../../hooks/useOpenVidu';
import { StreamCanvas } from '../../components/stream/StreamCanvas';
import {
  Buttons,
  Character,
  Container,
  MainWrapper,
  MyVideo,
  SideBar,
  YourVideo,
} from './SessionPageStyles';
import { Modal, Box, Typography, IconButton } from '@mui/material';

const SessionPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  console.log('오픈비두 시작');
  const userId = 'user01';
  const { streamList } = useOpenVidu(userId);
  const sessionOver = () => {
    setOpen(true);
  };

  const leaveSession = () => {
    setOpen(false);
    navigate('/');
  };

  return (
    <>
      {!open ? (
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
            <StreamCanvas
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
                <StreamCanvas
                  streamManager={streamList[1].streamManager}
                  name={streamList[1].userId}
                  avatarPath="http://localhost:3000/image.png"
                />
              ) : (
                <Loading />
              )}
            </YourVideo>
          </MainWrapper>
          <SideBar>
            <Character>Character</Character>
            <MyVideo>
              {streamList.length > 1 ? (
                <StreamCanvas
                  streamManager={streamList[0].streamManager}
                  name={streamList[0].userId}
                  avatarPath="http://localhost:3000/image.png"
                />
              ) : (
                <Loading />
              )}
            </MyVideo>
            <Buttons>
              <button>애니몬</button>
              <button onClick={sessionOver}>나가기</button>
            </Buttons>
          </SideBar>
        </Container>
      ) : (
        <Container>
          <Modal open={open} onClose={leaveSession} hideBackdrop={true}>
            <Box
              sx={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid black',
                boxShadow: 24,
                p: 4,
                textAlign: 'center',
              }}
            >
              <Typography variant="h4" component="h2">
                친구 조아?
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}
              >
                <IconButton onClick={leaveSession}>O</IconButton>
                <IconButton onClick={leaveSession}>X</IconButton>
              </Box>
            </Box>
          </Modal>
        </Container>
      )}
    </>
  );
};

export default SessionPage;
