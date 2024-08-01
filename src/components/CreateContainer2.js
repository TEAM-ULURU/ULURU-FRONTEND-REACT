import React, { useState, useEffect } from "react";
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

const CreateContainer2 = ({ onValueChange }) => {
  const [totalValue, setTotalValue] = useState(0); // 총 수치값
  const [angle, setAngle] = useState(0); // 게이지 선 각도 (왼쪽 끝을 가리키도록 초기값을 0도로 설정)
  const [showPopup, setShowPopup] = useState(false); // 팝업 상태
  const [controlGroups, setControlGroups] = useState([
    { id: Date.now(), value: 0 },
  ]);

  useEffect(() => {
    if (onValueChange) {
      onValueChange(totalValue);
    }
  }, [totalValue, onValueChange]);

  useEffect(() => {
    const newValue = controlGroups.reduce((acc, group) => acc + group.value, 0);
    setTotalValue(newValue);
  }, [controlGroups]);

  useEffect(() => {
    setAngle((totalValue / (controlGroups.length * 100)) * 180); // 각 control-group의 값을 합산하여 각도 설정
  }, [totalValue, controlGroups.length]);

  const addControlGroup = () => {
    setControlGroups([...controlGroups, { id: Date.now(), value: 0 }]);
  };

  const deleteControlGroup = (id) => {
    setControlGroups(controlGroups.filter((group) => group.id !== id));
  };

  const handleValueChange = (id, value) => {
    setControlGroups((prevGroups) =>
      prevGroups.map((group) => (group.id === id ? { ...group, value } : group))
    );
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
        <p className="percentage">{totalValue.toFixed(1)}%</p>
        <p className="description">
          혈중 알코올 농도 {(totalValue * 0.002).toFixed(2)}%
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
          />
        ))}
      </div>
    </div>
  );
};

export default CreateContainer2;
