import { OpenVidu, StreamManager } from 'openvidu-browser';
import axios from 'axios';
import React, { Component, useRef, useState, useEffect } from 'react';
import CanvasTag from '../../components/Stream/CanvasTag';

const APPLICATION_SERVER_URL = 'http://localhost:5000/';

interface AppState {
  mySessionId: string;
  myUserName: string;
  session?: any;
  mainStreamManager?: any;
  publisher?: any;
  subscribers: any;
  currentVideoDevice: any;
}

class Stream extends Component<{}, AppState> {
  private OV: any;

  constructor(props: {}) {
    super(props);

    this.state = {
      mySessionId: 'SessionA',
      myUserName: 'Participant' + Math.floor(Math.random() * 100),
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
      currentVideoDevice: undefined,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.handleAudio = this.handleAudio.bind(this);
    this.handleVideo = this.handleVideo.bind(this);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.onbeforeunload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload);
  }

  onbeforeunload(event: BeforeUnloadEvent) {
    this.leaveSession();
  }

  handleChangeSessionId(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  handleMainVideoStream(stream: any) {
    if (this.state.mainStreamManager !== stream.streamManager) {
      this.setState({
        mainStreamManager: stream.streamManager,
      });
    }
  }

  handleAudio(status: boolean) {
    this.state.publisher.publishAudio(!status);
  }

  handleVideo(status: boolean) {
    this.state.publisher.publishVideo(!status);
  }

  deleteSubscriber(streamManager: any) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }

  async joinSession() {
    this.OV = new OpenVidu();

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        const mySession = this.state.session!;

        mySession.on('streamCreated', (event: any) => {
          const subscriber = mySession.subscribe(event.stream);
          const subscribers = this.state.subscribers;
          subscribers.push(subscriber);
          this.setState({
            subscribers: subscribers,
          });
        });

        mySession.on('streamDestroyed', (event: any) => {
          this.deleteSubscriber(event.stream.streamManager);
        });

        mySession.on('exception', (exception: any) => {
          console.warn(exception);
        });

        this.getToken().then((token) => {
          mySession
            .connect(token, { clientData: this.state.myUserName })
            .then(async () => {
              let publisher = await this.OV.initPublisherAsync(undefined, {
                audioSource: undefined,
                videoSource: undefined,
                publishAudio: true,
                publishVideo: true,
                resolution: '640x480',
                frameRate: 30,
                insertMode: 'APPEND',
                mirror: false,
              });

              mySession.publish(publisher);

              const devices = await this.OV.getDevices();
              const videoDevices = devices.filter(
                (device: any) => device.kind === 'videoinput'
              );
              const currentVideoDeviceId = publisher
                .stream!.getMediaStream()
                .getVideoTracks()[0]
                .getSettings().deviceId;
              const currentVideoDevice = videoDevices.find(
                (device: any) => device.deviceId === currentVideoDeviceId
              );

              this.setState({
                mainStreamManager: publisher,
                publisher: publisher,
              });
            })
            .catch((error: any) => {
              console.log(
                'There was an error connecting to the session:',
                error.code,
                error.message
              );
            });
        });
      }
    );
  }

  leaveSession() {
    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: 'SessionA',
      myUserName: 'Participant' + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined,
    });
  }

  async switchCamera() {
    try {
      const devices = await this.OV.getDevices();
      const videoDevices = devices.filter(
        (device: any) => device.kind === 'videoinput'
      );

      if (videoDevices.length > 1) {
        const newVideoDevice = videoDevices.find(
          (device: any) =>
            device.deviceId !== this.state.currentVideoDevice.deviceId
        );

        if (newVideoDevice) {
          const newPublisher = this.OV.initPublisher(undefined, {
            videoSource: newVideoDevice.deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          if (this.state.session && this.state.mainStreamManager) {
            await this.state.session.unpublish(this.state.mainStreamManager);
          }

          if (this.state.session) {
            await this.state.session.publish(newPublisher);
          }

          this.setState({
            currentVideoDevice: newVideoDevice,
            mainStreamManager: newPublisher,
            publisher: newPublisher,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;
    const micStatus = true;
    const videoStatus = true;

    return (
      <div className="container">
        {this.state.session === undefined ? (
          <div id="join">
            <div id="img-div">
              <img
                src="resources/images/openvidu_grey_bg_transp_cropped.png"
                alt="OpenVidu logo"
              />
            </div>
            <div id="join-dialog" className="jumbotron vertical-center">
              <h1> Join a video session </h1>
              <form className="form-group" onSubmit={this.joinSession}>
                <p>
                  <label>Participant: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="userName"
                    value={myUserName}
                    onChange={this.handleChangeUserName}
                    required
                  />
                </p>
                <p>
                  <label> Session: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="sessionId"
                    value={mySessionId}
                    onChange={this.handleChangeSessionId}
                    required
                  />
                </p>
                <p className="text-center">
                  <input
                    className="btn btn-lg btn-success"
                    name="commit"
                    type="submit"
                    value="JOIN"
                  />
                </p>
              </form>
            </div>
          </div>
        ) : null}

        {this.state.session !== undefined ? (
          <div id="session">
            <div id="session-header">
              <h1 id="session-title">{mySessionId}</h1>
              <input
                className="btn btn-large btn-danger"
                type="button"
                id="buttonLeaveSession"
                onClick={this.leaveSession}
                value="Leave session"
              />
              <input
                className="btn btn-large btn-success"
                type="button"
                id="buttonSwitchCamera"
                onClick={this.switchCamera}
                value="Switch Camera"
              />
            </div>

            {this.state.mainStreamManager !== undefined ? (
              <div id="main-video" className="col-md-6">
                <CanvasTag
                  streamManager={this.state.mainStreamManager}
                  name={myUserName}
                  avatarPath="http://localhost:3000/image.png"
                  me={this.state.mainStreamManager.name === myUserName}
                />
              </div>
            ) : null}
            <div id="video-container" className="col-md-6">
              {this.state.publisher !== undefined ? (
                <div
                  className="stream-container col-md-6 col-xs-6"
                  onClick={() =>
                    this.handleMainVideoStream(this.state.publisher!.stream)
                  }
                >
                  <CanvasTag
                    streamManager={this.state.publisher}
                    name={this.state.publisher.name}
                    avatarPath="http://localhost:3000/image.png"
                    me={this.state.publisher.name === myUserName}
                  />
                </div>
              ) : null}
              {this.state.subscribers.map((sub: any) => (
                <div
                  key={sub.stream.streamId}
                  className="stream-container col-md-6 col-xs-6"
                  onClick={() => this.handleMainVideoStream(sub.stream)}
                >
                  <span>{sub.stream.connection.data}</span>
                  <CanvasTag
                    streamManager={sub}
                    name={myUserName}
                    avatarPath="http://localhost:3000/image.png"
                    me={sub.name === myUserName}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
  }

  async createSession(sessionId: string) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + 'api/sessions',
      { customSessionId: sessionId },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data; // The sessionId
  }

  async createToken(sessionId: string) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections',
      {},
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data; // The token
  }
}

export default Stream;
