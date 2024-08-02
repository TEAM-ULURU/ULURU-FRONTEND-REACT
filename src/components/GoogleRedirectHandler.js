//Google 인증 후 리디렉션된 URL에서 토큰을 추출하는 컴포넌트

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 토큰 정보 추출
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");

    if (accessToken) {
      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem("accessToken", accessToken);

      // 원하는 페이지로 리디렉션
      //navigate("/entering-page-1");
    } else {
      // 오류 처리
      console.error("Access token not found");
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default GoogleRedirectHandler;
