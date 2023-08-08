import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWebSocket } from '../../hooks/useWebSocket';

interface IProps {
  onChangeMicStatus: (status: boolean) => void;
  onChangeCameraStatus: (status: boolean) => void;
}

export const ControlBar: FC<IProps> = ({ ...callback }) => {
  const [micStatus, setMicStatus] = useState(true);
  const onChangeMicStatus = () => {
    setMicStatus((prev) => !prev);
  };
  useEffect(() => {
    callback.onChangeMicStatus(micStatus);
  }, [micStatus, callback]);

  const [cameraStatus, setCameraStatus] = useState(true);
  const onChangeCameraStatus = () => {
    setCameraStatus((prev) => !prev);
  };
  useEffect(() => {
    callback.onChangeCameraStatus(cameraStatus);
  }, [cameraStatus, callback]);

  return (
    <ControlBox
      micStatus={micStatus}
      onChangeMicStatus={onChangeMicStatus}
      cameraStatus={cameraStatus}
      onChangeCameraStatus={onChangeCameraStatus}
    />
  );
};

interface ControlBoxProps {
  micStatus: boolean;
  onChangeMicStatus: () => void;
  cameraStatus: boolean;
  onChangeCameraStatus: () => void;
}

export const ControlBox: FC<ControlBoxProps> = ({
  micStatus,
  onChangeMicStatus,
  cameraStatus,
  onChangeCameraStatus,
}) => {
  const navigate = useNavigate();
  const exit = async () => {
    navigate('/');
  };
  return (
    <div>
      <button onClick={onChangeMicStatus}>마이크</button>
      <button onClick={onChangeCameraStatus}>카메라</button>
      <button onClick={exit}>나가기</button>
    </div>
  );
};
