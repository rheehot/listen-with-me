import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { signIn } from '../../../modules/user';

import '../../../css/Sign.css';

const SignIn = ({ isActive, signIn, signInOauth, handleClose }) => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState({
    email: '',
    password: '',
  });

  const changeInfo = e => {
    setInfo({
      ...info,
      [e.target.id]: e.target.value,
    });
  };
  const onSignInSubmit = async e => {
    e.preventDefault();
    dispatch(signIn(info));
    // const result = dispatch(signIn(info));
    // console.log(result);
    // if (result) handleClose();
    // else alert('올바를 회원정보를 입력해주세요');
  };

  const responseGoogle = async res => {
    // 구글 로그인을 통해 받아온 데이터
    // console.log('>>TOTAL: ', res);
    const { accessToken } = res;
    const { profileObj, tokenObj } = res;

    const { id_token } = tokenObj;

    const { email, googleId, imageUrl, name } = profileObj;
    // console.log('client accessToken:', accessToken);
    // console.log('client data:', email, googleId, imageUrl, name);

    const body = { email, googleId, imageUrl, name, id_token };
    // console.log('>> client will send this BODY', body);

    try {
      const isSuccess = await signInOauth(body, accessToken);
      if (isSuccess) handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const responseFailGoogle = err => {
    // 에러발생시
    console.log(err);
  };

  return (
    <Modal
      show={isActive}
      onHide={handleClose}
      animation={true}
      className="signin__modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>로그인</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="signin">
          <div className="oauth">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="구글 계정으로 로그인 하기"
              onSuccess={responseGoogle}
              onFailure={responseFailGoogle}
              cookiePolicy={'single_host_origin'}
            />
            <button className="oauth__kakao oauth__button">Kakao 로그인</button>
          </div>
          <hr />
          <form onSubmit={onSignInSubmit} className="signin__info">
            <div className="info">
              <label htmlFor="email" className="info__label">
                이메일
              </label>
              <input
                className="info__input"
                type="email"
                id="email"
                value={info.email}
                onChange={changeInfo}
              />
            </div>
            <div className="info">
              <label htmlFor="password" className="info__label">
                비밀번호
              </label>
              <input
                className="info__input"
                type="password"
                id="password"
                value={info.password}
                onChange={changeInfo}
              />
            </div>

            <button className="signin__button sign__button">로그인</button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SignIn;
