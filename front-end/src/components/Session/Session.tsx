import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { useEffect, useState } from "react";
import StreamComponent from "./stream/StreamComponent";
import "./VideoRoomComponent.css";

import OpenViduLayout from "../layout/openvidu-layout";
import UserModel from "../models/user-model";
import ToolbarComponent from "./toolbar/ToolbarComponent";

const APPLICATION_SERVER_URL = "http://localhost:5000/";

const VideoRoomComponent = (props) => {
  const [session, setSession] = useState(null);
  const [localUser, setLocalUser] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);

  const layout = new OpenViduLayout();

  let remotes = [];
  let localUserAccessAllowed = false;
  let hasBeenUpdated = false;

  const joinSession = () => {
    const sessionName = props.sessionName || "SessionA";
    const userName =
      props.user || "OpenVidu_User" + Math.floor(Math.random() * 100);

    setSession(new OpenVidu().initSession());

    subscribeToStreamCreated();
    connectToSession(sessionName, userName);
  };

  const connectToSession = async (sessionName, userName) => {
    try {
      let token = props.token;
      if (token === undefined) {
        token = await getToken();
      }
      connect(token, userName);
    } catch (error) {
      console.error(
        "There was an error getting the token:",
        error.code,
        error.message
      );
      if (props.error) {
        props.error({
          error: error.error,
          message: error.message,
          code: error.code,
          status: error.status,
        });
      }
      alert("There was an error getting the token:", error.message);
    }
  };

  const connect = (token, userName) => {
    session
      .connect(token, { clientData: userName })
      .then(() => {
        connectWebCam();
      })
      .catch((error) => {
        if (props.error) {
          props.error({
            error: error.error,
            message: error.message,
            code: error.code,
            status: error.status,
          });
        }
        alert("There was an error connecting to the session:", error.message);
        console.log(
          "There was an error connecting to the session:",
          error.code,
          error.message
        );
      });
  };

  const connectWebCam = async () => {
    await session.getUserMedia({
      audioSource: undefined,
      videoSource: undefined,
    });
    const devices = await session.getDevices();
    const videoDevices = devices.filter(
      (device) => device.kind === "videoinput"
    );

    let publisher = session.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: videoDevices[0].deviceId,
      publishAudio: localUser.isAudioActive(),
      publishVideo: localUser.isVideoActive(),
      resolution: "640x480",
      frameRate: 60,
      insertMode: "APPEND",
    });

    if (session.capabilities.publish) {
      publisher.on("accessAllowed", () => {
        session.publish(publisher).then(() => {
          updateSubscribers();
          localUserAccessAllowed = true;
          if (props.joinSession) {
            props.joinSession();
          }
        });
      });
    }
    localUser.setNickname(userName);
    localUser.setConnectionId(session.connection.connectionId);
    localUser.setStreamManager(publisher);
    subscribeToStreamDestroyed();

    setLocalUser(localUser);
    setCurrentVideoDevice(videoDevices[0]);

    publisher.on("streamPlaying", (e) => {
      updateLayout();
      publisher.videos[0].video.parentElement.classList.remove("custom-class");
    });
  };

  const updateSubscribers = () => {
    const subscribers = remotes;
    setSubscribers(subscribers);
    if (localUser) {
      sendSignalUserChanged({
        isAudioActive: localUser.isAudioActive(),
        isVideoActive: localUser.isVideoActive(),
        nickname: localUser.getNickname(),
      });
    }
    updateLayout();
  };

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }

    // Empty all properties...
    setSession(null);
    setSubscribers([]);
    setLocalUser(null);
    setCurrentVideoDevice(null);
    if (props.leaveSession) {
      props.leaveSession();
    }
  };

  const camStatusChanged = () => {
    localUser.setVideoActive(!localUser.isVideoActive());
    localUser.getStreamManager().publishVideo(localUser.isVideoActive());
    sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
    setLocalUser(localUser);
  };

  const micStatusChanged = () => {
    localUser.setAudioActive(!localUser.isAudioActive());
    localUser.getStreamManager().publishAudio(localUser.isAudioActive());
    sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
    setLocalUser(localUser);
  };

  const nicknameChanged = (nickname) => {
    const updatedLocalUser = { ...localUser };
    updatedLocalUser.setNickname(nickname);
    setLocalUser(updatedLocalUser);
    sendSignalUserChanged({
      nickname: updatedLocalUser.getNickname(),
    });
  };

  const deleteSubscriber = (stream) => {
    const remoteUsers = subscribers;
    const userStream = remoteUsers.filter(
      (user) => user.getStreamManager().stream === stream
    )[0];
    const index = remoteUsers.indexOf(userStream, 0);
    if (index > -1) {
      remoteUsers.splice(index, 1);
      setSubscribers([...remoteUsers]);
    }
  };

  const subscribeToStreamCreated = () => {
    session.on("streamCreated", (event) => {
      const subscriber = session.subscribe(event.stream, undefined);
      subscriber.on("streamPlaying", (e) => {
        subscriber.videos[0].video.parentElement.classList.remove(
          "custom-class"
        );
      });
      const newUser = new UserModel();
      newUser.setStreamManager(subscriber);
      newUser.setConnectionId(event.stream.connection.connectionId);
      newUser.setType("remote");
      const nickname = event.stream.connection.data.split("%")[0];
      newUser.setNickname(JSON.parse(nickname).clientData);
      remotes.push(newUser);
      if (localUserAccessAllowed) {
        updateSubscribers();
      }
    });
  };

  const subscribeToStreamDestroyed = () => {
    session.on("streamDestroyed", (event) => {
      deleteSubscriber(event.stream);
      setTimeout(() => {}, 20);
      updateLayout();
    });
  };

  const updateLayout = () => {
    setTimeout(() => {
      layout.updateLayout();
    }, 20);
  };

  const sendSignalUserChanged = (data) => {
    const signalOptions = {
      data: JSON.stringify(data),
      type: "userChanged",
    };
    session.signal(signalOptions);
  };

  const checkSize = () => {
    if (
      document.getElementById("layout").offsetWidth <= 700 &&
      !hasBeenUpdated
    ) {
      hasBeenUpdated = true;
    }
    if (document.getElementById("layout").offsetWidth > 700 && hasBeenUpdated) {
      hasBeenUpdated = false;
    }
  };

  useEffect(() => {
    const openViduLayoutOptions = {
      maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
      minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
      fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
      bigClass: "OV_big", // The class to add to elements that should be sized bigger
      bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
      bigFixedRatio: false, // fixedRatio for the big ones
      bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
      bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
      bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
      animate: true, // Whether you want to animate the transitions
    };

    layout.initLayoutContainer(
      document.getElementById("layout"),
      openViduLayoutOptions
    );

    window.addEventListener("beforeunload", leaveSession);
    window.addEventListener("resize", updateLayout);
    window.addEventListener("resize", checkSize);
    joinSession();

    return () => {
      window.removeEventListener("beforeunload", leaveSession);
      window.removeEventListener("resize", updateLayout);
      window.removeEventListener("resize", checkSize);
      leaveSession();
    };
  }, []);

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */
  const getToken = async () => {
    const sessionId = await createSession(mySessionId);
    return await createToken(sessionId);
  };

  const createSession = async (sessionId) => {
    const response = await axios.post(
      `${APPLICATION_SERVER_URL}api/sessions`,
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(
      `${APPLICATION_SERVER_URL}api/sessions/${sessionId}/connections`,
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
  };

  const mySessionId = session ? session.sessionId : "SessionA";

  return (
    <div className='container' id='container'>
      {localUser && (
        <ToolbarComponent
          sessionId={mySessionId}
          user={localUser}
          camStatusChanged={camStatusChanged}
          micStatusChanged={micStatusChanged}
          leaveSession={leaveSession}
        />
      )}

      <div id='layout' className='bounds'>
        {subscribers.map((sub, i) => (
          <div
            key={i}
            className='OT_root OT_publisher custom-class'
            id='remoteUsers'>
            <StreamComponent
              user={sub}
              streamId={sub.streamManager.stream.streamId}
            />
          </div>
        ))}
        {localUser && localUser.getStreamManager() !== undefined && (
          <div className='OT_root OT_publisher custom-class' id='localUser'>
            <StreamComponent user={localUser} />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoRoomComponent;
