import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateContainer2.css";
import rainbowGauge from "../img/rainbowGauge.png"; // 무지개 반원 이미지 가져오기
import drinkIcon from "../img/drinkIcon.png"; // 음료 아이콘 이미지 가져오기
import gaugeLine from "../img/gaugeLine.png"; // 바늘 이미지 가져오기
import addDrink from "../img/Icon/addDrink.png"; // 주류 추가 이미지 가져오기
import addIcon from "../img/Icon/addIcon.png"; // + 아이콘 이미지 가져오기
import minusIcon from "../img/Icon/minusIcon.png"; // - 아이콘 이미지 가져오기
import oing from "../img/Icon/oing.png"; // ? 아이콘 이미지 가져오기
import Popup from "./Popup";
import ControlGroup from "./ControlGroup"; // ControlGroup 컴포넌트 가져오기

const CreateContainer2 = ({ userData, setUserData, memberId }) => {
  // const initialUserData = {
  //   name: "",
  //   preferredDrink: "맥주",
  //   intoxicationLevel: 2,
  //   bloodAlcoholLevel: 0.02,
  // };

  // 초기 상태 설정
  useEffect(() => {
	 console.info(memberId);
    setUserData(userData);
    setAngle((userData.intoxicationLevel / 100) * 180);
  }, []);

  const [angle, setAngle] = useState((userData.intoxicationLevel / 100) * 180); // 각도 설정
  const [a, b] = useState(memberId);
  const [showPopup, setShowPopup] = useState(false); // 팝업 상태
  const [controlGroups, setControlGroups] = useState([
    {
      id: Date.now(),
      value: 0,
      drinkType: userData.preferredDrink,
      volume: userData.preferredDrink === "소주" ? "50ml" : "225ml",
    },
  ]);

  const handleValueChange = (newIntoxicationLevel, newBloodAlcoholLevel) => {
    // intoxicationLevel 값을 0과 100 사이로 제한
    const limitedIntoxicationLevel = Math.min(
      Math.max(newIntoxicationLevel, 0),
      100
    );
    setUserData((prevData) => ({
      ...prevData,
      intoxicationLevel: limitedIntoxicationLevel,
      bloodAlcoholLevel: newBloodAlcoholLevel,
    }));
    setAngle((limitedIntoxicationLevel / 100) * 180);
  };

  const addControlGroup = () => {
    setControlGroups([
      ...controlGroups,
      {
        id: Date.now(),
        value: 0,
        drinkType: userData.preferredDrink,
        volume: userData.preferredDrink === "소주" ? "50ml" : "225ml",
      },
    ]);
  };

  const deleteControlGroup = (id) => {
    setControlGroups(controlGroups.filter((group) => group.id !== id));
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
	

  return (
    <div className="create-container2">
      <div className="gauge-container">
        <img src={rainbowGauge} alt="Gauge" className="gauge" />
        <div
          className="gauge-needle"
          style={{ transform: `rotate(${angle}deg)` }}
        ></div>
      </div>
      <div className="value-display">
        <p className="percentage">
			{userData.intoxicationLevel}%
        </p>
        <p className="description">
          혈중 알코올 농도 {userData.bloodAlcoholLevel}%
          <img
            src={oing}
            alt="oing"
            className="oing"
            width="18px"
            onClick={togglePopup}
          />
        </p>
      </div>
      {showPopup && <Popup onClose={togglePopup} />}
      <div className="controls">
        <div className="control-nav">
          <span>주류</span>
          <img
            src={addDrink}
            alt="addDrink"
            className="addDrink"
            width="28px"
            onClick={addControlGroup}
          />
        </div>
        {controlGroups.map((group) => (
          <ControlGroup
            key={group.id}
            id={group.id}
            onDelete={deleteControlGroup}
            onValueChange={handleValueChange}
            drinkType={group.drinkType}
            volume={group.volume}
            memberId={a}
          />
        ))}
      </div>
    </div>
  );
};

export default CreateContainer2;