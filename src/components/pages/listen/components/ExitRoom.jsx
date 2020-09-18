import React from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ExitRoom = ({ finalizeRoom, history }) => {
  const outFromRoom = () => {
    const result = window.confirm('방을 삭제하시겠습니까?');
    if (result) {
      finalizeRoom();
      localStorage.removeItem('isHost');
      history.push('/playlist');
    }
  };
  return (
    <div className="exit-room">
      <button className="exit-room__button" onClick={outFromRoom}>
        <FontAwesomeIcon icon={['fas', 'sign-out-alt']} />
      </button>
    </div>
  );
};

export default withRouter(ExitRoom);