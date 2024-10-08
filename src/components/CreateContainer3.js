import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateContainer3.css";
import locationStart from "../img/Icon/locationStart.png"; // 출발지 아이콘 이미지 가져오기
import locationEnd from "../img/Icon/locationEnd.png"; // 도착지 아이콘 이미지 가져오기
import trainIcon from "../img/Icon/train.png"; //대중교통 아이콘
import carIcon from "../img/Icon/car.png"; //자동차 아이콘
import walkIcon from "../img/Icon/walk.png"; //걷기 아이콘
import kakaoMapIcon from "../img/Icon/kakaoMap.png"; //카카오맵 아이콘
import kakaoTIcon from "../img/Icon/kakaoT.png"; //카카오T 아이콘

const CreateContainer3 = ({ locationData, setLocationData }) => {
  // 초기 임의 설정값
  const initialLocationData = {
    currentLocation: "현위치:",
    address: "우리집",
    trainTime: 30,
    carTime: 20,
    walkTime: 60,
    kakaoMapUrl: "https://map.kakao.com/?q=", // 기본 URL
    kakaoTaxiUrl:
      "https://play.google.com/store/apps/details?id=com.kakao.taxi&hl=ko&pli=1", // 기본 URL
  };

  const [location1, setLocation1] = useState(
    initialLocationData.currentLocation
  );
  const [location2, setLocation2] = useState(initialLocationData.address);
  const [kakaoMapUrl, setKakaoMapUrl] = useState(
    initialLocationData.kakaoMapUrl
  );
  const [kakaoTaxiUrl, setKakaoTaxiUrl] = useState(
    initialLocationData.kakaoTaxiUrl
  );

  useEffect(() => {
    // 백엔드에 요청할 정보
    const fetchLocationData = async () => {
      try {
        const response = await axios.get("/api/locationData");
        setLocationData(response.data);

        setLocation1(response.data.currentLocation);
        setLocation2(response.data.address);

        setKakaoMapUrl(response.data.kakaoMapUrl);
        setKakaoTaxiUrl(response.data.kakaoTaxiUrl);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchLocationData();
  }, [setLocationData]);

  const handleLocation1Change = (e) => {
    // 바뀌면 백엔드에 전송
    const newLocation1 = e.target.value;
    setLocation1(newLocation1);
    // axios.post("/api/updateLocation1", { location1: newLocation1 });
  };

  const handleLocation2Change = (e) => {
    // 바뀌면 백엔드에 전송
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
            <span>
              {locationData.trainTime || initialLocationData.trainTime}분
            </span>
          </div>
          <div className="goTime-item">
            <img src={carIcon} alt="Car" className="goIcon2" />
            <span>{locationData.carTime || initialLocationData.carTime}분</span>
          </div>
          <div className="goTime-item">
            <img src={walkIcon} alt="Walk" className="goIcon3" />
            <span>
              {locationData.walkTime || initialLocationData.walkTime}분
            </span>
          </div>
        </div>
        <div className="appLink">
          <a href={kakaoMapUrl} target="_blank" rel="noopener noreferrer">
            <img src={kakaoMapIcon} alt="Kakao Map" className="kbIcon" />
          </a>
          <a href={kakaoTaxiUrl} target="_blank" rel="noopener noreferrer">
            <img src={kakaoTIcon} alt="Kakao T" className="kbIcon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer3;
