import React, { useEffect } from "react";
import "./LoginScreen.css";
import { Link } from "react-router-dom";
import logo from "../img/logo.png"; // 이미지 파일 가져오기
import kakao from "../img/Login/kakao.png";
import naver from "../img/Login/naver.png";
import google from "../img/Login/google.png";

const LoginScreen = () => {
  useEffect(() => {
    // Kakao SDK 초기화
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("d05707469281dc335bcd4ef1f7ab312c"); // 발급받은 JavaScript 키로 SDK 초기화
    }
  }, []);

  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      success: (authObj) => {
        console.log(authObj);
        // 서버로 토큰 전달 또는 다른 로직 수행
      },
      fail: (err) => {
        console.error(err);
      },
    });
  };

  return (
    <div className="container">
      <img className="logo" src={logo} alt="Logo" />
      <h2 className="subtitle">안전한 음주생활의 시작,</h2>
      <h1 className="maintitle">al-T</h1>
      <Link to="/entering-page-1">
        <img
          className="kakaoButton"
          src={kakao}
          alt="Kakao Icon"
          onClick={handleKakaoLogin}
        />
      </Link>
      <Link to="/entering-page-1">
        <img className="naverButton" src={naver} alt="Naver Icon" />
      </Link>
      <Link to="/entering-page-1">
        <img className="googleButton" src={google} alt="Google Icon" />
      </Link>
      <Link to="/entering-page-1">
        <div className="otherMethods">다른 방법으로 시작하기</div>
      </Link>
    </div>
  );
};

export default LoginScreen;
