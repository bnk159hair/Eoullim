import React, { Component, Ref, RefObject } from 'react';
import { StreamManager } from 'openvidu-browser';

interface OpenViduVideoProps {
    streamManager: StreamManager;
}

export default class OpenViduVideoComponent extends Component<OpenViduVideoProps> {
    private videoRef: RefObject<HTMLVideoElement>;

    constructor(props: OpenViduVideoProps) {
        super(props);
        this.videoRef = React.createRef<HTMLVideoElement>();
    }

    componentDidUpdate(prevProps: OpenViduVideoProps) {
        if (prevProps.streamManager !== this.props.streamManager) {
            this.props.streamManager.addVideoElement(this.videoRef.current!);
        }
    }

    componentDidMount() {
        this.props.streamManager.addVideoElement(this.videoRef.current!);
    }

    render() {
        return <video autoPlay ref={this.videoRef} />;
    }
}
