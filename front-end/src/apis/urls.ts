const DEV = process.env.NODE_ENV !== 'production';

const PORT_WEB = ':3000';
const PORT_SERVER = ':8081';
const PORT_OPENVIDU = ':4443';

const URL_LOCAL = 'http://localhost';
const URL_RELEASE = 'https://i9c207.p.ssafy.io';

// export const WS_BASE_URL =
//   (DEV ? `ws://localhost${PORT_SERVER}` : 'wss://i9c207.p.ssafy.io') + '/ws';
export const WS_BASE_URL = 'wss://i9c207.p.ssafy.io' + '/ws';

// export const API_BASE_URL = (DEV ? URL_RELEASE : URL_RELEASE) + '/api/v1';
export const API_BASE_URL = URL_RELEASE + '/api/v1';

export const OPENVIDU_SERVER_URL = URL_RELEASE;
