import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const query = new URLSearchParams(location.search);
      const state = query.get("state");
      const code = query.get("code");

      if (state && code) {
        try {
          const response = await fetch(
            `https://alt-backend.com/login/oauth2/code/google?state=${encodeURIComponent(state)}&code=${encodeURIComponent(code)}`,
            {
              credentials: "include",
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            const { accessToken } = data.object;
            const isRedirectHomePage = data.isRedirectHomePage;
            console.log(data);

            if (accessToken) {
              // 액세스 토큰을 로컬 스토리지에 저장
              localStorage.setItem("accessToken", `Bearer ${accessToken}`);

              // isRedirectHomePage 값에 따라 페이지 이동
              if (isRedirectHomePage) {
                navigate("/home");
              } else {
                navigate("/entering-page-1");
              }
            } else {
              console.error("Access token is missing from response.");
            }
          } else {
            throw new Error("Received non-JSON response from server");
          }
        } catch (error) {
          console.error("Error fetching data from backend:", error);
          navigate("/"); // 에러 발생 시 메인 페이지로 리디렉션
        }
      } else {
        console.error("State or code is missing from URL.");
        navigate("/"); // 쿼리 파라미터가 없으면 메인 페이지로 리디렉션
      }
    };

    fetchData();
  }, [location, navigate]);

  return null; // 화면에 아무것도 표시하지 않습니다.
};

export default OAuthCallback;
