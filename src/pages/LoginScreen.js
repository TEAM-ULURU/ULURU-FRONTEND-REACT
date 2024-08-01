import React, { useEffect } from "react";
import "./LoginScreen.css";
import { Link } from "react-router-dom";
import logo from "../img/logo.png"; // 이미지 파일 가져오기
import kakao from "../img/Login/kakao.png";
import naver from "../img/Login/naver.png";
import google from "../img/Login/google.png";

const LoginScreen = () => {
  const handleGoogleLogin = async () => {
    // Google 로그인 URL로 리디렉션
    window.location.href =
      "https://723f-210-106-232-160.ngrok-free.app/oauth2/authorization/google";
  };

  return (
    <div className="container">
      <img className="logo" src={logo} alt="Logo" />
      <h2 className="subtitle">안전한 음주생활의 시작,</h2>
      <h1 className="maintitle">al-T</h1>
      <Link to="/entering-page-1">
        <img className="kakaoButton" src={kakao} alt="Kakao Icon" />
      </Link>
      <Link to="/entering-page-1">
        <img className="naverButton" src={naver} alt="Naver Icon" />
      </Link>

      <img
        className="googleButton"
        src={google}
        alt="Google Icon"
        onClick={handleGoogleLogin}
      />

      <Link to="/entering-page-1">
        <div className="otherMethods">다른 방법으로 시작하기</div>
      </Link>
    </div>
  );
};

export default LoginScreen;
