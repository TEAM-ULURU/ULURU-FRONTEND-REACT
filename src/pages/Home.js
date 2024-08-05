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
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [roomCode, setRoomCode] = useState(""); // Room code 상태 추가

  // 초기 상태 정의
  const [userData, setUserData] = useState({
    name: "",
    intoxicationLevel: 0,
    bloodAlcoholLevel: 0,
    preferredDrink: "맥주",
  });

  const [locationData, setLocationData] = useState({
    currentLocation: "현위치:",
    address: "주소",
    trainTime: 0,
    carTime: 0,
    walkTime: 0,
  });

  const [members, setMembers] = useState([]);

  useEffect(() => {
    // 사용자 이름 가져오기 요청
    const fetchUserName = async () => {
      try {
        const response = await axios.get("/api/userName");
        setUserData((prevData) => ({
          ...prevData,
          name: response.data.name,
        }));
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };

    fetchUserName();
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

  const fetchRoomInfo = async () => {
    try {
      const response = await axios.get(
        "http://ec2-18-116-81-21.us-east-2.compute.amazonaws.com:8080/api/room/get-info",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicm9sZSI6IlVzZXIiLCJleHAiOjE3MjM3MDE1ODZ9.OUeRxAO1NwPdfCDSA9AM0mqUVMMWyfvrupuTYlT9cHU",
          },
        }
      );

      if (response.data.success) {
        const { roomCode, membersInRoom } = response.data.object;
        setRoomCode(roomCode);
        setMembers(
          membersInRoom.map((member) => ({
            name: member.name,
            intoxicationLevel: member.currentLevelOfIntoxication,
            bloodAlcoholLevel: member.currentBloodAlcoholLevel,
          }))
        );
        setShowCreateContainer(true);
      } else {
        setShowCreateContainer(false);
      }
    } catch (error) {
      console.error("Error fetching room info:", error);
    }
  };

  useEffect(() => {
    fetchRoomInfo();
    const interval = setInterval(fetchRoomInfo, 30000); // 30초마다 방 정보 갱신

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
  }, []);

  const handleCreateContainerClick = async () => {
    try {
      const response = await axios.post(
        "http://ec2-18-116-81-21.us-east-2.compute.amazonaws.com:8080/api/room/create",
        {},
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicm9sZSI6IlVzZXIiLCJleHAiOjE3MjM3MDE1ODZ9.OUeRxAO1NwPdfCDSA9AM0mqUVMMWyfvrupuTYlT9cHU",
          },
        }
      );

      const { roomCode, membersInRoom } = response.data.object;
      setRoomCode(roomCode); // Room code 저장
      setMembers(
        membersInRoom.map((member) => ({
          name: member.name,
          intoxicationLevel: member.currentLevelOfIntoxication,
          bloodAlcoholLevel: member.currentBloodAlcoholLevel,
        }))
      );

      setShowCreateContainer(true);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const handleExitClick = async () => {
    setShowCreateContainer(false);
    try {
      await axios.post(
        `http://ec2-18-116-81-21.us-east-2.compute.amazonaws.com:8080/api/room/leave?roomCode=${roomCode}`,
        {},
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicm9sZSI6IlVzZXIiLCJleHAiOjE3MjM3MDE1ODZ9.OUeRxAO1NwPdfCDSA9AM0mqUVMMWyfvrupuTYlT9cHU",
          },
        }
      );
      console.log("Exit Success");
    } catch (error) {
      console.error("Error sending leave request:", error);
    }
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

  const handleJoinSuccess = (data) => {
    const { roomCode, membersInRoom } = data;
    setRoomCode(roomCode);
    setMembers(
      membersInRoom.map((member) => ({
        name: member.name,
        intoxicationLevel: member.currentLevelOfIntoxication,
        bloodAlcoholLevel: member.currentBloodAlcoholLevel,
      }))
    );
    setShowCreateContainer(true); // 참가 성공 시 create-container1-expanded 열기
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
                      backgroundColor: getRainbowColor(
                        userData.intoxicationLevel
                      ),
                    }}
                  ></span>
                  <span>{userData.name} </span>
                  <img
                    src={captainIcon}
                    className="captain-icon"
                    width="20px"
                  />
                  <span className="member-percentage">
                    {userData.intoxicationLevel.toFixed(1)}% (
                    {userData.bloodAlcoholLevel.toFixed(2)}%)
                  </span>
                </div>
                {members.map((member, index) => (
                  <div className="member-item" key={index}>
                    <span
                      className="member-status"
                      style={{
                        backgroundColor: getRainbowColor(
                          member.intoxicationLevel
                        ),
                      }}
                    ></span>
                    <span>{member.name} </span>
                    <span className="member-percentage">
                      {member.intoxicationLevel.toFixed(1)}% (
                      {member.bloodAlcoholLevel.toFixed(2)}%)
                    </span>
                  </div>
                ))}
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
          onValueChange={(value) =>
            setUserData((prevData) => ({
              ...prevData,
              intoxicationLevel: value,
            }))
          }
          userData={userData}
          setUserData={setUserData}
        />
        <CreateContainer3
          locationData={locationData}
          setLocationData={setLocationData}
        />
        {showInviteModal && (
          <InviteModal
            onClose={handleCloseInviteModal}
            roomCode={roomCode} // roomCode 전달
          />
        )}
        {showInputModal && (
          <InputModal
            onClose={handleCloseInputModal}
            onJoinSuccess={handleJoinSuccess}
          />
        )}
      </div>
      <BottomNav></BottomNav>
    </div>
  );
};

export default Home;
