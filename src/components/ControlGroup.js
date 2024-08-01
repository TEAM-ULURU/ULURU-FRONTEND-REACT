import React, { useState, useEffect } from "react";
import drinkIcon from "../img/drinkIcon.png"; // 음료 아이콘 이미지 가져오기
import addIcon from "../img/Icon/addIcon.png"; // + 아이콘 이미지 가져오기
import minusIcon from "../img/Icon/minusIcon.png"; // - 아이콘 이미지 가져오기

const ControlGroup = ({ id, onDelete, onValueChange }) => {
  const [value, setValue] = useState(0); // 수치값
  const [angle, setAngle] = useState(0); // 게이지 선 각도 (왼쪽 끝을 가리키도록 초기값을 0도로 설정)
  const [showOptions, setShowOptions] = useState(false);
  const [customVolume, setCustomVolume] = useState(""); // 직접 선택한 용량 값
  const [selectedDrink, setSelectedDrink] = useState("맥주");
  const [selectedVolume, setSelectedVolume] = useState("225ml");
  const [pendingDrink, setPendingDrink] = useState("맥주");
  const [pendingVolume, setPendingVolume] = useState("225ml");

  useEffect(() => {
    const bottomNav = document.querySelector(".bottom-nav");
    if (showOptions) {
      bottomNav.style.zIndex = "1"; // 리스트 박스가 나타날 때 z-index를 낮춤
    } else {
      bottomNav.style.zIndex = "6"; // 리스트 박스가 사라질 때 z-index를 원래대로
    }

    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".options-container") &&
        !event.target.closest(".control-group")
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  useEffect(() => {
    if (onValueChange) {
      onValueChange(id, value);
    }
  }, [value, onValueChange, id]);

  const handleIncrement = () => {
    const newValue = Math.min(value + 1, 100);
    setValue(newValue);
    setAngle((newValue / 100) * 180); // 0에서 100까지의 수치에 맞춰 각도 설정
  };

  const handleDecrement = () => {
    const newValue = Math.max(value - 1, 0);
    setValue(newValue);
    setAngle((newValue / 100) * 180); // 0에서 100까지의 수치에 맞춰 각도 설정
  };

  const handleGroupClick = () => {
    setShowOptions(!showOptions);
  };

  const handleDrinkSelection = (drink) => {
    setPendingDrink(drink);
  };

  const handleVolumeSelection = (volume) => {
    if (volume === "custom") {
      setPendingVolume("");
      setCustomVolume("");
    } else {
      setPendingVolume(volume);
      setCustomVolume("");
    }
  };

  const handleCustomVolumeChange = (e) => {
    setCustomVolume(e.target.value);
    setPendingVolume(e.target.value + "ml");
  };

  const applySelection = () => {
    setSelectedDrink(pendingDrink);
    setSelectedVolume(pendingVolume);
    setShowOptions(false);
  };

  return (
    <div
      className="control-group"
      onContextMenu={(event) => {
        event.preventDefault();
        onDelete(id);
      }}
    >
      <div className="drink-group" onClick={handleGroupClick}>
        <div className="glass">
          <img
            src={drinkIcon}
            alt="drinkIcon"
            className="drinkIcon"
            width="32px"
          />
          <input type="number" value={value} readOnly className="value-input" />
        </div>
        <span>{`${selectedDrink} , ${selectedVolume}`}</span>
      </div>
      <div className="buttons">
        <button onClick={handleIncrement} className="increment-button">
          <img src={addIcon} alt="addIcon" className="addIcon2" width="50px" />
        </button>
        <button onClick={handleDecrement} className="decrement-button">
          <img
            src={minusIcon}
            alt="minusIcon"
            className="minusIcon2"
            width="50px"
          />
        </button>
      </div>
      {showOptions && (
        <div className="options-container">
          <div className="drink-options">
            <p className="vc">주종 변경</p>
            <div
              className={`option-item ${
                pendingDrink === "소주" ? "selected" : ""
              }`}
              onClick={() => handleDrinkSelection("소주")}
            >
              소주
            </div>
            <div
              className={`option-item ${
                pendingDrink === "맥주" ? "selected" : ""
              }`}
              onClick={() => handleDrinkSelection("맥주")}
            >
              맥주
            </div>
          </div>
          <div className="volume-options">
            <p className="vc">용량 변경</p>
            <p className="vl">
              <div
                className={`option-item ${
                  pendingVolume === "50ml" ? "selected" : ""
                }`}
                onClick={() => handleVolumeSelection("50ml")}
              >
                50ml (상용 소주잔)
              </div>
              <div
                className={`option-item ${
                  pendingVolume === "360ml" ? "selected" : ""
                }`}
                onClick={() => handleVolumeSelection("360ml")}
              >
                360ml (소주 1병)
              </div>
              <div
                className={`option-item ${
                  pendingVolume === "225ml" ? "selected" : ""
                }`}
                onClick={() => handleVolumeSelection("225ml")}
              >
                225ml (상용 글라스 잔)
              </div>
              <div
                className={`option-item ${
                  pendingVolume === "355ml" ? "selected" : ""
                }`}
                onClick={() => handleVolumeSelection("355ml")}
              >
                355ml (작은캔)
              </div>
              <div
                className={`option-item ${
                  pendingVolume === "500ml" ? "selected" : ""
                }`}
                onClick={() => handleVolumeSelection("500ml")}
              >
                500ml (큰캔)
              </div>
              <div className="custom-volume">
                <input
                  type="number"
                  placeholder="직접입력"
                  value={customVolume}
                  onChange={handleCustomVolumeChange}
                  className="custom-volume-input"
                />
                <span className="vm"> (ml)</span>
              </div>
            </p>
          </div>

          <button className="dg" onClick={applySelection}>
            닫기
          </button>
        </div>
      )}
    </div>
  );
};

export default ControlGroup;