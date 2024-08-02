import React, { useState, useEffect } from "react";
import "./AddInfoPopup.css";
import closeIcon from "../img/Icon/closeIcon.png"; // editIcon 이미지 가져오기

const AddInfoPopup = ({ onClose, onSubmit, initialData }) => {
  const [drunkennessLevel, setDrunkennessLevel] = useState("");
  const [hangoverLevel, setHangoverLevel] = useState("");
  const [food, setFood] = useState("");
  const [selectColor, setSelectColor] = useState("#a0a0a0");

  useEffect(() => {
    if (initialData) {
      setDrunkennessLevel(initialData.drunkennessLevel || "");
      setHangoverLevel(initialData.hangoverLevel || "");
      setFood(initialData.food || "");
    }
  }, [initialData]);

  const isFormValid = drunkennessLevel !== "" && hangoverLevel !== "";

  const handleSubmit = () => {
    if (isFormValid) {
      const hangoverText =
        hangoverLevel === "상"
          ? "높은 수준 숙취"
          : hangoverLevel === "중"
          ? "중간 수준 숙취"
          : "낮은 수준 숙취";
      onSubmit({
        drunkennessLevel: `${drunkennessLevel}%`,
        hangoverText,
        food,
      });
      onClose();
    }
  };

  const handleSelectChange = (e) => {
    setHangoverLevel(e.target.value);
    setSelectColor(e.target.value ? "#000" : "#a0a0a0");
  };

  return (
    <div className="add-info-popup">
      <div className="popup-content">
        <div className="popup-header">
          <p>추가 정보 기입</p>
          <img
            src={closeIcon}
            className="closeB"
            onClick={onClose}
            width="18px"
          />
        </div>
        <div className="popup-body">
          <div className="iw">
            <div className="input-group1">
              <label>체감 취한 정도</label>
              <input
                type="number"
                value={drunkennessLevel}
                onChange={(e) => setDrunkennessLevel(e.target.value)}
                placeholder="00 %"
                min="0"
                max="100"
              />
            </div>
            <div className="input-group2">
              <label>다음날 숙취</label>
              <select
                value={hangoverLevel}
                onChange={handleSelectChange}
                style={{ color: selectColor }}
              >
                <option value="" disabled selected>
                  상 / 중 / 하
                </option>
                <option value="상">상</option>
                <option value="중">중</option>
                <option value="하">하</option>
              </select>
            </div>
          </div>
          <div className="input-group3">
            <label>먹은 안주</label>
            <input
              type="text"
              value={food}
              onChange={(e) => setFood(e.target.value)}
              placeholder="기록용이니 자유롭게 입력해주세요"
            />
          </div>
        </div>
        <div className="popup-footer">
          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddInfoPopup;
