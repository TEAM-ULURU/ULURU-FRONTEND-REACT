//이 객체가 날짜마다 있는거임.
import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./CalContainer3.css";
import addInput from "../img/Icon/addInput.png"; // 이미지 가져오기
import editIcon from "../img/Icon/EditIcon.png"; // editIcon 이미지 가져오기
import withIcon from "../img/Icon/withIcon.png"; // withIcon 이미지 가져오기
import AddInfoPopup from "./AddInfoPopup"; // AddInfoPopup 컴포넌트 가져오기

const CalContainer3 = ({ data }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState(null);

  const getGradientPathColor = () => {
    return (
      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradient" x1="70%" y1="10%" x2="10%" y2="100%">
            <stop offset="0%" stopColor="#74FFCD" />
            <stop offset="50%" stopColor="#FFF96A" />
            <stop offset="100%" stopColor="#FF5959" />
          </linearGradient>
        </defs>
      </svg>
    );
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

  const handleAddInfoClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handlePopupSubmit = (info) => {
    setAdditionalInfo(info);
    // 백엔드로 정보 보내기
    fetch("/api/save-additional-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    }).catch((error) => console.error("Error saving data:", error));
  };

  return (
    <div className="cal-container3">
      <div className="mini-title">al-Tracker</div>
      <div className="cal-container3-1">
        <div className="progress-bar">
          {getGradientPathColor()}
          <CircularProgressbar
            value={data.percentage}
            text={`${data.percentage.toFixed(1)}%`}
            styles={buildStyles({
              pathColor: "url(#gradient)",
              textColor: "#444444",
              trailColor: "#d6d6d6",
              backgroundColor: "#3e98c7",
              pathTransitionDuration: 0.5,
              textSize: "18px",
            })}
          />
        </div>
        <div className="details">
          <ul className="add-inf">
            <li>혈중 알코올 농도: {data.alcoholLevel}%</li>
            <li>
              {data.drinkType}: {data.bottleAmount}병 (약 {data.mlAmount}ml)
            </li>
            {additionalInfo && (
              <>
                <li>체감 취한 정도: {additionalInfo.drunkennessLevel}</li>
                <li>{additionalInfo.hangoverText}</li>
                {additionalInfo.food ? (
                  <li>먹은 안주: {additionalInfo.food}</li>
                ) : (
                  <li>먹은 안주 기록X</li>
                )}
              </>
            )}
          </ul>
          {additionalInfo ? (
            <img
              className="editInputButton"
              src={editIcon}
              alt="Edit Input"
              onClick={handleAddInfoClick}
            />
          ) : (
            <img
              className="addInputButton"
              src={addInput}
              alt="Add Input"
              onClick={handleAddInfoClick}
            />
          )}
        </div>
      </div>
      <div className="mini-title">with</div>
      <div className="cal-container3-2">
        {data.friends.length === 0 ? (
          <div className="no-frd">함께 마신 친구 정보가 없습니다.</div>
        ) : (
          <ul className="friends-list">
            {data.friends.map((friend, index) => (
              <li key={index} className="friend-item">
                <span
                  className="status-icon"
                  style={{
                    backgroundColor: getRainbowColor(friend.percentage),
                  }}
                ></span>
                <span className="friend-name">{friend.name}</span>
                <span className="friend-percentage">
                  {friend.percentage.toFixed(1)}%
                </span>
                <img src={withIcon} width="25px" alt="With Icon" />
                <span className="friend-count">{friend.count}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {showPopup && (
        <AddInfoPopup onClose={handlePopupClose} onSubmit={handlePopupSubmit} />
      )}
    </div>
  );
};

export default CalContainer3;
