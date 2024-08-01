import React, { useState, useEffect } from "react";
import "./CreateContainer3.css";
import locationStart from "../img/Icon/locationStart.png"; // 출발지 아이콘 이미지 가져오기
import locationEnd from "../img/Icon/locationEnd.png"; // 도착지 아이콘 이미지 가져오기
import trainIcon from "../img/Icon/train.png"; //대중교통 아이콘
import carIcon from "../img/Icon/car.png"; //자동차 아이콘
import walkIcon from "../img/Icon/walk.png"; //걷기 아이콘
import kakaoMapIcon from "../img/Icon/kakaoMap.png"; //카카오맵 아이콘
import kakaoTIcon from "../img/Icon/kakaoT.png"; //카카오T 아이콘

const CreateContainer3 = () => {
  const [location1, setLocation1] = useState("현위치: "); //위치 데이터1
  const [location2, setLocation2] = useState(""); //위치 데이터2
  const [trainTime, setTrainTime] = useState(0); //대중교통 시간데이터
  const [carTime, setCarTime] = useState(0); //자동차 시간 데이터
  const [walkTime, setWalkTime] = useState(0); //걷기 시간 데이터

  useEffect(() => {
    // 여기에 백엔드에서 데이터를 불러오는 코드를 작성합니다.
    // 예시:
    fetch("/api/locations")
      .then((response) => response.json())
      .then((data) => {
        setLocation1("현위치: " + data.location1);
        setLocation2(data.location2);
      });
    fetch("/api/goTime")
      .then((response) => response.json())
      .then((data) => {
        setTrainTime(data.trainTime);
        setCarTime(data.carTime);
        setWalkTime(data.walkTime);
      });
  }, []);

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
            // readOnly
            onChange={(e) => setLocation1(e.target.value)}
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
            // readOnly
            onChange={(e) => setLocation2(e.target.value)}
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
