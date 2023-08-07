import React from 'react';
import { RecordItemContainer } from './RecordListItemStyles';

interface RecordListItemProps{
    animonName: string;
    school: string;
    video_path: string;
    name: string;
}

const RecordListItem: React.FC<RecordListItemProps> =({name,animonName,school,video_path}) => {
    return (
        <RecordItemContainer>
            {name}
            {animonName}
            {school}
            {video_path}
            상대방이름
            상대방학교
            동영상
        </RecordItemContainer>
    );
};

export default RecordListItem;