import React from 'react';
import { RecordItemContainer,RecordProfileImg,OpponentImformation,RecordUrl } from './RecordListItemStyles';

interface RecordListItemProps{
    animonName: string;
    create_time: string;
    school: string;
    video_path: string;
    name: string;
}

const RecordListItem: React.FC<RecordListItemProps> =({name,animonName,school,video_path,create_time}) => {
    const IMGURL = `/${animonName}.png`
    
    const formatTime = (timeString: string) => {
        const date = new Date(timeString);
        return date.toLocaleString(); // 원하는 형식으로 변환할 수 있습니다.
      };

    return (
        <RecordItemContainer>
            <RecordProfileImg style={{ backgroundImage: `url(${IMGURL})` }}/>
            <OpponentImformation>
                <div>
                    친구 이름 : {name}
                </div>
                <div>
                    친구 학교 : {school}
                </div>
                <div>
                    녹화 날짜 : {formatTime(create_time)}
                </div>
            </OpponentImformation>
            <a href={video_path}>
            <RecordUrl/>
            </a>
        </RecordItemContainer>
    );
};

export default RecordListItem;