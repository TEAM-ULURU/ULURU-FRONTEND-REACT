import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./CalContainer3.css";
import addInput from "../img/Icon/addInput.png"; // 이미지 가져오기
import withIcon from "../img/Icon/withIcon.png"; // withIcon 이미지 가져오기

const CalContainer3 = () => {
  const [data, setData] = useState({
    percentage: 70.23,
    alcoholLevel: 0.14,
    drinkType: "소주",
    bottleAmount: 1.33,
    mlAmount: 479,
    friends: [
      { name: "이다민", percentage: 33.3, count: 2 },
      { name: "김나영", percentage: 66.6, count: 1 },
      { name: "강찬욱", percentage: 30.0, count: 4 },
    ],
  });

  useEffect(() => {
    // 백엔드에서 데이터 가져오기
    fetch("/api/alcohol-data")
      .then((response) => response.json())
      .then((data) => {
        setData({
          percentage: data.percentage,
          alcoholLevel: data.alcoholLevel,
          drinkType: data.drinkType,
          bottleAmount: data.bottleAmount,
          mlAmount: data.mlAmount,
          friends: data.friends.map((friend) => ({
            ...friend,
            statusColor: getRainbowColor(friend.percentage),
          })),
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

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
              {data.drinkType} {data.bottleAmount}병 (약 {data.mlAmount}ml)
            </li>
          </ul>
          <img className="addInputButton" src={addInput} alt="Add Input" />
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
    </div>
  );
};

export default CalContainer3;
