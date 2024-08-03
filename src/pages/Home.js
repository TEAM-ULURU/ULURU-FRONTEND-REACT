import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import TopNav from "../components/TopNav";
import BottomNav from "../components/BottomNav";
import CreateContainer2 from "../components/CreateContainer2";
import CreateContainer3 from "../components/CreateContainer3";
import InviteModal from "../components/InviteModal";
import InputModal from "../components/InputModal"; // InputModal 컴포넌트 가져오기
import addIcon from "../img/Icon/addIcon.png";
import inIcon from "../img/Icon/inIcon.png";
import invite from "../img/Icon/invite.png";
import exitIcon from "../img/Icon/exitIcon.png";
import captainIcon from "../img/Icon/captainIcon.png";

const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showCreateContainer, setShowCreateContainer] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false); // 모달 표시 여부
  const [value, setValue] = useState(0);
  const [showInviteModal, setShowInviteModal] = useState(false);

  // 초기 상태 정의
  const [userData, setUserData] = useState({
    name: "김나영",
    preferredDrink: "소주",
    intoxicationLevel: 30,
    bloodAlcoholLevel: 0,
    currentLocation: "현위치:",
    address: "주소",
    trainTime: 0,
    carTime: 0,
    walkTime: 0,
  });

  useEffect(() => {
    // 사용자 데이터를 백엔드에서 받아오는 함수
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/userData");
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

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

  const handleCreateContainerClick = () => {
    setShowCreateContainer(true);
  };

  const handleExitClick = () => {
    setShowCreateContainer(false);
  };

  const handleInviteClick = () => {
    setShowInviteModal(true);
  };

  const handleCloseInviteModal = () => {
    setShowInviteModal(false);
  };

  const handleInputModalClick = () => {
    setShowInputModal(true);
  };

  const handleCloseInputModal = () => {
    setShowInputModal(false);
  };

  const getRainbowColor = (value) => {
    const colors = ["#74FFCD", "#FFF96A", "#FF5959"];
    const ratio = value / 100;
    const startColor = colors[0];
    const endColor = colors[2];
    const midColor = colors[1];
    if (ratio < 0.5) {
      const midRatio = ratio * 2;
      return interpolateColor(startColor, midColor, midRatio);
    } else {
      const endRatio = (ratio - 0.5) * 2;
      return interpolateColor(midColor, endColor, endRatio);
    }
  };

  const interpolateColor = (color1, color2, ratio) => {
    const hex = (color) => {
      color = color.replace("#", "");
      return parseInt(color, 16);
    };

    const r1 = (hex(color1) >> 16) & 0xff;
    const g1 = (hex(color1) >> 8) & 0xff;
    const b1 = hex(color1) & 0xff;

    const r2 = (hex(color2) >> 16) & 0xff;
    const g2 = (hex(color2) >> 8) & 0xff;
    const b2 = hex(color2) & 0xff;

    const r = Math.round(r1 + ratio * (r2 - r1));
    const g = Math.round(g1 + ratio * (g2 - g1));
    const b = Math.round(b1 + ratio * (b2 - b1));

    return `rgb(${r},${g},${b})`;
  };

  return (
    <div className="MainContainer">
      <TopNav scrolled={scrolled} />
      <div className={`main-page ${scrolled ? "scrolled" : ""}`}>
        <div className="add-member">
          {!showCreateContainer ? (
            <>
              <div
                className="create-container1"
                onClick={handleCreateContainerClick}
              >
                <img src={addIcon} alt="Add" className="add-icon" />
                <p>술자리 생성</p>
              </div>
              <div
                className="create-container1-1"
                onClick={handleInputModalClick}
              >
                <img src={inIcon} alt="Add" className="in-icon" />
                <p>술자리 참가</p>
              </div>
            </>
          ) : (
            <div className="create-container1-expanded">
              <p>술자리</p>
              <div className="member-list">
                <div className="member-item">
                  <span
                    className="member-status"
                    style={{
                      backgroundColor: getRainbowColor(value),
                    }}
                  ></span>
                  <span>{userData.name} </span>
                  <img
                    src={captainIcon}
                    className="captain-icon"
                    width="20px"
                  />
                  <span className="member-percentage">
                    {value.toFixed(1)}% ({(value * 0.002).toFixed(2)}%)
                  </span>
                </div>
              </div>
              <div className="bottomButton">
                <img
                  src={invite}
                  className="invite-button"
                  width="180px"
                  onClick={handleInviteClick}
                />
                <img
                  src={exitIcon}
                  alt="Refresh"
                  className="exitIcon"
                  width="40px"
                  onClick={handleExitClick}
                />
              </div>
            </div>
          )}
        </div>
        <CreateContainer2
          onValueChange={setValue}
          preferredDrink={userData.preferredDrink}
          intoxicationLevel={userData.intoxicationLevel}
          bloodAlcoholLevel={userData.bloodAlcoholLevel}
        />
        <CreateContainer3
          currentLocation={userData.currentLocation}
          address={userData.address}
          trainTime={userData.trainTime}
          carTime={userData.carTime}
          walkTime={userData.walkTime}
        />
        {showInviteModal && <InviteModal onClose={handleCloseInviteModal} />}
        {showInputModal && <InputModal onClose={handleCloseInputModal} />}
      </div>
      <BottomNav></BottomNav>
    </div>
  );
};

export default Home;
