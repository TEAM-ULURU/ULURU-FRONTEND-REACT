import React, { useState, useEffect } from "react";
import "./MyPage.css";
import TopNav from "../components/TopNav";
import BottomNav from "../components/BottomNav";
import whiteCircle from "../img/Icon/whiteCircle.png"; // 이미지 파일 가져오기
import mycharFe from "../img/mycharFe.png";
import mycharMale from "../img/mycharMale.png";
import logout from "../img/Icon/logout.png";
import myEdit from "../img/Icon/myEdit.png";
import accDel from "../img/Icon/accDel.png";
import minigoogle from "../img/Login/minigoogle.png";
import minikakao from "../img/Login/minikakao.png";

function MyPage() {
  const [scrolled, setScrolled] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "김성무",
    email: "ksmi8704@naver.com",
    emailType: "kakao",
    gender: "남성",
    height: 181,
    weight: 72,
    bodyFat: 16,
    address: "서울시 광진구 능동로 120",
    addressDetail: "건국대학교 쿨하우스 1335호",
    emergencyContact: "010-3333-4444",
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.querySelector(".main-page").scrollTop;
      if (scrollTop > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const mainPage = document.querySelector(".main-page");
    mainPage.addEventListener("scroll", handleScroll);

    return () => {
      mainPage.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // 백엔드에서 사용자 데이터를 가져오기
    /*
    axios
      .get("/api/user")
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    */
  }, []);

  const characterImage = userInfo.gender === "남성" ? mycharMale : mycharFe;
  const emailTypeIcon = userInfo.emailType === "kakao" ? minikakao : minigoogle;

  return (
    <div className="MainContainer">
      <TopNav scrolled={scrolled} />
      <div className={`main-page ${scrolled ? "scrolled" : ""}`}>
        <div className="myp-container">
          <img
            className="whiteCircle"
            src={whiteCircle}
            width="120px"
            alt="프로필 배경"
          />
          <img className="character" src={characterImage} alt="캐릭터" />
          <div className="user-info">
            <p>
              {userInfo.name} <img className="myEI" src={myEdit}></img>
            </p>

            <p>
              {userInfo.email}
              <img
                className="email-type-icon"
                src={emailTypeIcon}
                alt="이메일 종류"
              />
            </p>
          </div>
          <div className="basic-info">
            <p>기본 정보</p>
            <p>{`${userInfo.gender} / ${userInfo.height} cm / ${userInfo.weight} kg / ${userInfo.bodyFat}%`}</p>
          </div>
          <div className="address">
            <p>주소</p>
            <p>{userInfo.address},</p>
            <p>{userInfo.addressDetail}</p>
          </div>
          <div className="emergency-contact">
            <p>비상연락처</p>
            <p>{userInfo.emergencyContact}</p>
          </div>
        </div>
        <img className="logout" src={logout} alt="로그아웃" />
        <img className="accDel" src={accDel} alt="계정 삭제" />
      </div>
      <BottomNav />
    </div>
  );
}

export default MyPage;
