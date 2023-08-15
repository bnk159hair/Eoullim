import React, { useRef, useState } from 'react';
import {
  ModalOverlay,
  ModalContent,
  HeaderContainer,
  FormContainer,
  VideoInfo,
  GuideInfo,
  GuideContainer
} from './RecordVideoStyles';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Button } from '@mui/material';
import ReactPlayer from 'react-player';

interface VideoModalProps {
  onClose: () => void;
  videoPath: string;
  guideSeq: string;
  timeStamp: string;
}

const VideoModal: React.FC<VideoModalProps> = ({
  onClose,
  videoPath,
  guideSeq,
  timeStamp,
}) => {
  const guideScript: { [key: string]: string } = {
      '1': '안녕~ 다들 만나서 반가워!! 나는 어울림학교에 다니는 곰탱이 라고 해. 너희는 어디 학교 다니는지 이름이 뭔지~ 소개 해줄 수 있어?',
    '2': '나는 만화를 아주 좋아하는데 엉덩이탐정을 가장 좋아해. 너희는 어떤 만화를 좋아해? 친구에게 너가 가장 좋아하는 만화를 소개해줘.',
    '3': '나는 공룡을 아주 아주 좋아해 어제 마트에 갔는데 공룡 장난감이 정말 멋지더라. 내일 내 생일인데 생일 선물로 공룡 장난감을 받고 싶어. 너희는 생일에 무슨 선물 받고 싶어?',
    '4': '나는 저번 주에 형이랑 짜장면을 시켜 먹었는데 정말 맛있었어. 너희는 무슨 음식을 제일 좋아해?',
    '5': '나는 평소에 친구들이랑 숨바꼭질 하는 게 제일 재밌어. 너희는 친구들이랑 뭐하고 놀 때 제일 재밌어?',
    '6': '나는 의사 선생님이 되는 게 꿈이야. 아픈 사람들을 치료해주는 멋진 의사 선생님이 될 거야. 너희는 꿈이 뭐야?',
    '7': '나는 요즘 가수 중에 뉴진스가 제일 좋아! 너희는 좋아하는 가수 있어?',
    '8': '나는 학교에서 배우는 과목 중에 수학 수업을 제일 좋아해. 너희는 무슨 과목을 가장 좋아해?',
    '9': '나 속상한 일이 있었는데 들어줄래?? 어제, 동생이랑 놀다가 싸워서 엄마한테 혼났거든. 근데 동생이 잘못한건데 엄마가 나만 혼낸 거 있지? 너무 슬펐어... 너희는 슬펐던 적이 있어?',
    '10': '나는 방학에 가족들이랑 바닷가에 다녀왔던 게 가장 재밌었어. 너희는 가족들과 어디 놀러갔을 때 가장 좋았어? 가장 즐거웠던 기억을 말해줘.',
    '11': '나는 이번 주말에 엄마 아빠랑 놀이공원에 놀러가고 싶어! 너희는 엄마 아빠랑 뭐하고 싶어?',
    '12': '나는 엄마 아빠가 나한테 사랑해 라고 할 때 가장 좋아! 너희는 엄마 아빠가 뭐라고 말해줄 때 가장 좋아?',
    '13': '오늘 너희를 만나서 정말 즐거웠어. 너희는 새로운 친구를 만나보니 어때? 재밌었어?   우리 다음에 또 만나자~~ 안녕~~!',
  };

  const videoRef = useRef<any>(null);
  const controlsRef = useRef<any>(null);

  const [state, setState] = useState({
    playing: true, // 재생중인지
    muted: false, // 음소거인지
    controls: false, // 기본으로 제공되는 컨트롤러 사용할건지
    volume: 0.5, // 볼륨크기
    playbackRate: 1.0, // 배속
    played: 0, // 재생의 정도 (value)
    seeking: false, // 재생바를 움직이고 있는지
    duration: 0, // 전체 시간
  });

  const { playing, muted, volume, playbackRate, played } = state;

  let count = 0;

  const format = (seconds: string) => {
    if (isNaN(Number(seconds))) {
      return `00:00`;
    }
    const date = new Date(Number(seconds));
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = pad(date.getUTCSeconds());
    if (hh) {
      return `${hh}:${pad(mm)}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  function pad(string: number) {
    return ('0' + String(string)).slice(-2);
  }

  const guideIndex = guideSeq?.split(' ');
  const highlight = timeStamp?.split(' ');
  const info = [];

  for (let i = 0; i < 4; i++) {
    const index = guideIndex[i];
    const guide = guideScript[index];
    const time = format(highlight[i]);
    info.push([guide, time, Number(highlight[i]) / 1000]);
  }

  const progressHandler = (changeState: any) => {
    if (controlsRef.current && count > 3) {
      controlsRef.current.style.visibility = 'hidden';
      count = 0;
    }
    if (
      controlsRef.current &&
      controlsRef.current.style.visibility === 'visible'
    ) {
      count += 1;
    }
    if (!state.seeking) {
      setState({ ...state, ...changeState });
    }
  };

  return (
    <>
      <ModalOverlay>
        <ModalContent>
          <HeaderContainer>
            <IconButton onClick={onClose}>
              <CloseIcon fontSize="large" />
            </IconButton>
          </HeaderContainer>
          <FormContainer>
            <ReactPlayer
              ref={videoRef}
              url={videoPath} // 서버에서 받아온 video url
              playing={playing} // true = 재생중 / false = 멈춤
              controls={true} // 기본 컨트롤러 사용
              muted={muted} // 음소거인지
              volume={volume} // 소리조절 기능
              playbackRate={playbackRate} // 배속기능
              onProgress={progressHandler} // 재생 및 로드된 시점을 반환
            />
            <VideoInfo>
            <GuideContainer>
              {info ? (
                info.map(([guide, time, second]: any[], index: number) => (
                  <div
                    className="timestamp_box"
                    key={index}
                    onClick={() => {
                      videoRef.current.seekTo(second);
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <span>{time}</span>
                    </Button>
                    <GuideInfo>{guide}</GuideInfo>
                  </div>
                ))
              ) : (
                <></>
              )}
              </GuideContainer>
            </VideoInfo>
          </FormContainer>
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default VideoModal;
