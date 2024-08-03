import React, { useState } from "react";
import "./CreateContainer3.css";
import locationStart from "../img/Icon/locationStart.png"; // 출발지 아이콘 이미지 가져오기
import locationEnd from "../img/Icon/locationEnd.png"; // 도착지 아이콘 이미지 가져오기
import trainIcon from "../img/Icon/train.png"; //대중교통 아이콘
import carIcon from "../img/Icon/car.png"; //자동차 아이콘
import walkIcon from "../img/Icon/walk.png"; //걷기 아이콘
import kakaoMapIcon from "../img/Icon/kakaoMap.png"; //카카오맵 아이콘
import kakaoTIcon from "../img/Icon/kakaoT.png"; //카카오T 아이콘

const CreateContainer3 = ({
  currentLocation,
  address,
  trainTime,
  carTime,
  walkTime,
}) => {
  const [location1, setLocation1] = useState(currentLocation); // 초기값 설정
  const [location2, setLocation2] = useState(address); // 초기값 설정

  const handleLocation1Change = (e) => {
    const newLocation1 = e.target.value;
    setLocation1(newLocation1);
    // axios.post("/api/updateLocation1", { location1: newLocation1 });
  };

  const handleLocation2Change = (e) => {
    const newLocation2 = e.target.value;
    setLocation2(newLocation2);
    // axios.post("/api/updateLocation2", { location2: newLocation2 });
  };

  return (
    <div className="create-container3">
      <p>귀가도우미</p>
      <div className="location-container">
        <div className="start-location">
          <img
            src={locationStart}
            alt="start-icon"
            className="locationStart"
            width="45px"
          />
          <input
            type="text"
            value={location1}
            onChange={handleLocation1Change}
            className="location-input"
          />
        </div>
        <div className="location-connector"></div>
        <div className="end-location">
          <img
            src={locationEnd}
            alt="end-icon"
            className="locationEnd"
            width="45px"
          />
          <input
            type="text"
            value={location2}
            onChange={handleLocation2Change}
            className="location-input"
          />
        </div>
        <div className="goTime">
          <div className="goTime-item">
            <img src={trainIcon} alt="Train" className="goIcon1" />
            <span>{trainTime}분</span>
          </div>
          <div className="goTime-item">
            <img src={carIcon} alt="Car" className="goIcon2" />
            <span>{carTime}분</span>
          </div>
          <div className="goTime-item">
            <img src={walkIcon} alt="Walk" className="goIcon3" />
            <span>{walkTime}분</span>
          </div>
        </div>
        <div className="appLink">
          <img src={kakaoMapIcon} alt="Kakao Map" className="kbIcon" />
          <img src={kakaoTIcon} alt="Kakao T" className="kbIcon" />
        </div>
      </div>
    </div>
  );
};

export default CreateContainer3;
