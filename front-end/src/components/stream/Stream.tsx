import React, { useState } from "react";
import "./StreamComponent.css";
import OvVideoComponent from "./OvVideo";
import MicOff from "@material-ui/icons/MicOff";
import VideocamOff from "@material-ui/icons/VideocamOff";

const StreamComponent = ({ user }) => {
  const [nickname] = useState(user.getNickname());
  const [mutedSound, setMutedSound] = useState(false);

  const toggleSound = () => {
    setMutedSound((prevMutedSound) => !prevMutedSound);
  };

  return (
    <div className='OT_widget-container'>
      <div className='nickname'>
        <span id='nickname'>{nickname}</span>
      </div>

      {user !== undefined && user.getStreamManager() !== undefined ? (
        <div className='streamComponent'>
          <OvVideoComponent user={user} mutedSound={mutedSound} />
          <div id='statusIcons'>
            {!user.isVideoActive() ? (
              <div id='camIcon'>
                <VideocamOff id='statusCam' />
              </div>
            ) : null}

            {!user.isAudioActive() ? (
              <div id='micIcon'>
                <MicOff id='statusMic' />
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default StreamComponent;
