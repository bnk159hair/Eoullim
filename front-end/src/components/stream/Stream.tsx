import { useState } from 'react';
import './StreamComponent.css';
import OvVideoComponent from './OvVideo';

const StreamComponent = (user: any) => {
  return (
    <div>
      <OvVideoComponent user={user} />
    </div>
    // <div className="OT_widget-container">
    //   {user !== undefined && user.getStreamManager() !== undefined ? (
    //     <div className="streamComponent">
    //       <OvVideoComponent user={user} />
    //     </div>
    //   ) : null}
    // </div>
  );
};

export default StreamComponent;
