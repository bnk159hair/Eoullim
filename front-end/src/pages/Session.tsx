import React, { useState, useEffect } from 'react';
import { AnimonVideo } from '../components/Animon/AnimonVideo'

export const Session: FC<Iprops> = (props) => {
    return (
        <AnimonVideo
            streamManager={stream.streamManager}
            name='participant'
            avatarPath={userInfo!.avatar_image_path}
        />
    )
}
  