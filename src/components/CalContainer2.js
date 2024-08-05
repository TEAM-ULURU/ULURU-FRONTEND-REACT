import React, { useEffect, useState } from "react";
import moment from "moment";
import "./CalContainer2.css";
import inc from "../img/Icon/inc.png"; // 이미지 가져오기
import dec from "../img/Icon/dec.png";

const CalContainer2 = () => {
  // 어제부터 7일 전까지의 날짜 계산
  const lastWeekDates = [];
  for (let i = 7; i > 0; i--) {
    lastWeekDates.push(moment().subtract(i, "days").format("M.D"));
  }

  const [data, setData] = useState({
    drinkingCounts: 7,
    avgDrinking: 55,
    lastWeekComparison1: 133,
    lastWeekComparison2: 80,
    comparison1Status: "증가", // 초기값 설정
    comparison2Status: "감소", // 초기값 설정
    dailyDrinking: lastWeekDates.map((date, index) => ({
      date: date,
      percentage: [21, 7, 50, 80, 18, 100, 33][index] || 0, // 예시 데이터
    })),
  });

  useEffect(() => {
    // 백엔드에서 데이터 받아오기 (예: fetch API)
    fetch("/api/drinking-data")
      .then((response) => response.json())
      .then((data) => {
        setData({
          drinkingCounts: data.drinkingCounts,
          avgDrinking: data.avgDrinking,
          lastWeekComparison1: data.lastWeekComparison1,
          lastWeekComparison2: data.lastWeekComparison2,
          comparison1Status: data.comparison1Status,
          comparison2Status: data.comparison2Status,
          dailyDrinking: lastWeekDates.map((date, index) => ({
            date: date,
            percentage: data.dailyDrinking[index] || 0,
          })),
        });
      });
  }, []);

  const getBarColor = (percentage) => {
    const gradientStops = [
      { stop: 0, color: "#74FFCD" }, // 시작색상
      { stop: 50, color: "#FFF96A" }, // 중간색상
      { stop: 100, color: "#FF5959" }, // 끝색상
    ];

    if (percentage === 0) return gradientStops[0].color;
    if (percentage === 100)
      return `linear-gradient(to top, ${gradientStops[0].color}, ${gradientStops[1].color}, ${gradientStops[2].color})`;

    const getIntermediateColor = (start, end, ratio) => {
      const hex = (color) => parseInt(color.slice(1), 16);
      const r = Math.floor(
        (1 - ratio) * (hex(start) >> 16) + ratio * (hex(end) >> 16)
      );
      const g = Math.floor(
        (1 - ratio) * ((hex(start) >> 8) & 0xff) +
          ratio * ((hex(end) >> 8) & 0xff)
      );
      const b = Math.floor(
        (1 - ratio) * (hex(start) & 0xff) + ratio * (hex(end) & 0xff)
      );
      return `rgb(${r}, ${g}, ${b})`;
    };

    let gradient = "";
    if (percentage <= 50) {
      const ratio = percentage / 50;
      const color = getIntermediateColor(
        gradientStops[0].color,
        gradientStops[1].color,
        ratio
      );
      gradient = `linear-gradient(to top, ${gradientStops[0].color}, ${color})`;
    } else {
      const ratio = (percentage - 50) / 50;
      const color = getIntermediateColor(
        gradientStops[1].color,
        gradientStops[2].color,
        ratio
      );
      gradient = `linear-gradient(to top, ${gradientStops[0].color}, ${gradientStops[1].color}, ${color})`;
    }

    return gradient;
  };

  const getComparisonIcon = (status) => {
    if (status === "증가") {
      return <img src={inc} alt="증가" className="comparison-icon" />;
    } else if (status === "감소") {
      return <img src={dec} alt="감소" className="comparison-icon" />;
    } else {
      return null;
    }
  };

  return (
    <div className="cal-container2">
      <div className="jb">주간 분석</div>
      <div className="chart">
        {data.dailyDrinking.map((day, index) => (
          <div
            key={index}
            className="chart-bar"
            style={{
              height: `${day.percentage}%`,
              background: getBarColor(day.percentage),
            }}
          >
            <span className="chart-label">{day.date}</span>
          </div>
        ))}
        <div className="chart-average-line" style={{ bottom: "48.5%" }}></div>
        <span className="chart-average-line-50">50%</span>
      </div>
      <div className="statistics">
        <div className="stat-item1">
          <div className="stat-item1-1">
            <span>주간 음주 횟수</span>
            <p>{data.drinkingCounts}회</p>
          </div>
          <div className="stat-item1-2">
            {getComparisonIcon(data.comparison1Status)}
            <span className="dabi">지난주 대비 </span>
            <span>{Math.abs(data.lastWeekComparison1)}%</span>
          </div>
        </div>
        <div
          className="statistics-line"
          style={{ width: "2px", height: "125px", backgroundColor: "#CECECE" }}
        ></div>
        <div className="stat-item2">
          <div className="stat-item2-1">
            <span>평균 음주량</span>
            <p>{data.avgDrinking}%</p>
          </div>
          <div className="stat-item2-2">
            {getComparisonIcon(data.comparison2Status)}
            <span className="dabi">지난주 대비 </span>
            <span>{Math.abs(data.lastWeekComparison2)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalContainer2;
