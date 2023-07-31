import React from "react";
import "./ToolbarComponent.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Mic from "@material-ui/icons/Mic";
import MicOff from "@material-ui/icons/MicOff";
import Videocam from "@material-ui/icons/Videocam";
import VideocamOff from "@material-ui/icons/VideocamOff";
import IconButton from "@material-ui/core/IconButton";

const ToolbarComponent = ({
  sessionId,
  user,
  micStatusChanged,
  camStatusChanged,
  leaveSession,
}) => {
  return (
    <AppBar className='toolbar' id='header'>
      <Toolbar className='toolbar'>
        <div id='navSessionInfo'>
          {sessionId && (
            <div id='titleContent'>
              <span id='session-title'>{sessionId}</span>
            </div>
          )}
        </div>

        <div className='buttonsContent'>
          <IconButton
            color='inherit'
            className='navButton'
            id='navMicButton'
            onClick={micStatusChanged}>
            {user !== undefined && user.isAudioActive() ? (
              <Mic />
            ) : (
              <MicOff color='secondary' />
            )}
          </IconButton>

          <IconButton
            color='inherit'
            className='navButton'
            id='navCamButton'
            onClick={camStatusChanged}>
            {user !== undefined && user.isVideoActive() ? (
              <Videocam />
            ) : (
              <VideocamOff color='secondary' />
            )}
          </IconButton>

          <IconButton
            color='secondary'
            className='navButton'
            onClick={leaveSession}
            id='navLeaveButton'>
            ㅃ
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default ToolbarComponent;
