import React from "react";
import "./LoginScreen.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import fetchData from "./api";
import logo from "../img/logo.png"; // 이미지 파일 가져오기
import kakao from "../img/Login/kakao.png";
import naver from "../img/Login/naver.png";
import google from "../img/Login/google.png";

const LoginScreen = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // 백엔드 서버의 OAuth 엔드포인트로 리디렉션
    window.location.href =
      "http://ec2-18-116-81-21.us-east-2.compute.amazonaws.com:8080/oauth2/authorization/google";
  };
  // Google 로그인 이후에 호출될 함수
  const fetchTokenAndNavigate = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    if (code) {
      try {
        const response = await axios.get(
          `http://ec2-18-116-81-21.us-east-2.compute.amazonaws.com:8080/auth/google/callback?code=${code}`
        );
        const { access_token } = response.data;
        localStorage.setItem("token", access_token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;
        navigate("/entering-page-1");
      } catch (error) {
        console.error("Failed to fetch token:", error);
      }
    }
  };

  // useEffect를 사용하여 컴포넌트가 마운트될 때 토큰을 가져오도록 합니다.
  React.useEffect(() => {
    fetchTokenAndNavigate();
  }, []);

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
