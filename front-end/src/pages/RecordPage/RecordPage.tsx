import { useState, useEffect } from 'react';
import RecordListItem from '../../components/record/RecordListItem';
import {
  RecordPageContainer,
  EmptyRecord,
  Scroll,
  BackIcon,
} from './RecordPageStyles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { tokenState } from '../../atoms/Auth';
import { useRecoilValue } from 'recoil';
import { Profilekey } from '../../atoms/Profile';

interface Record {
  animonName: string;
  create_time: string;
  record_id: number;
  school: string;
  video_path: string;
  name: string;
}

const RecordPage = () => {
  const token = useRecoilValue(tokenState);
  const profileId = useRecoilValue(Profilekey);
  const [records, setRecords] = useState<Record[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getRecord();
  }, [profileId, token]);

  const getRecord = () => {
    axios
      .get(`https://i9c207.p.ssafy.io/api/openvidu/recordings/${profileId}`)
      .then((response) => {
        const data = response.data;
        console.log(response);
        setRecords(data);
        console.log('녹화영상 불러오기');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getBack = () => {
    navigate('/profile');
  };

  return (
    <RecordPageContainer>
      <BackIcon onClick={getBack} />
      {records.length > 0 ? (
        <Scroll>
          {records.map((record) => (
            <RecordListItem
              key={record.record_id}
              name={record.name}
              animonName={record.animonName}
              school={record.school}
              video_path={record.video_path}
              create_time={record.create_time}
            />
          ))}
        </Scroll>
      ) : (
        <EmptyRecord />
      )}
    </RecordPageContainer>
  );
};

export default RecordPage;
