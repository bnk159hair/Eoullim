import React, { useState } from 'react';
import {
  RecordItemContainer,
  RecordProfileImg,
  OpponentImformation,
  RecordUrl,
} from './RecordListItemStyles';
import VideoModal from './RecordVideo';

interface RecordListItemProps {
  animonName: string;
  create_time: string;
  school: string;
  video_path: string;
  name: string;
  guide_seq: string;
  timeline: string;
}

const RecordListItem: React.FC<RecordListItemProps> = ({
  name,
  animonName,
  school,
  video_path,
  create_time,
  guide_seq,
  timeline,
}) => {
  const IMGURL = `/${animonName}.png`;
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleString(); // 원하는 형식으로 변환할 수 있습니다.
  };

  return (
    <RecordItemContainer>
      <RecordProfileImg style={{ backgroundImage: `url(${IMGURL})` }} />
      <OpponentImformation>
        <div>친구 이름 : {name}</div>
        <div>친구 학교 : {school}초등학교</div>
        <div>녹화 날짜 : {formatTime(create_time)}</div>
      </OpponentImformation>
      {isModalOpen && (
        <VideoModal
          onClose={closeModal}
          videoPath={video_path}
          guideSeq={guide_seq}
          timeStamp={timeline}
        />
      )}
      <RecordUrl onClick={openModal} />
    </RecordItemContainer>
  );
};

export default RecordListItem;
