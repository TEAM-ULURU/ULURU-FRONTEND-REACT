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
  const [angle, setAngle] = useState(0); // 각도 초기값 설정
  const [showPopup, setShowPopup] = useState(false); // 팝업 상태
  const [controlGroups, setControlGroups] = useState([
    {
      id: Date.now(),
      value: 0,
      drinkType: userData.preferredDrink,
      volume: userData.preferredDrink === "소주" ? "50ml" : "225ml",
    },
  ]);

  useEffect(() => {
    if (memberId) {
      // memberId가 존재하는 경우에만 작업 수행
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `https://brave-ariela-davidlee-c2a7ce37.koyeb.app/member_info/${memberId}`
          );
          const userInfo = response.data;
          setUserData((prevData) => ({
            ...prevData,
            intoxicationLevel: userInfo.current_level_of_intoxication,
            bloodAlcoholLevel: userInfo.current_blood_alcohol_level,
          }));
          console.log(userData.intoxicationLevel);
          console.log("정보업데이트 완료");
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [memberId, setUserData]);

  // userData가 변경될 때마다 각도 업데이트
  useEffect(() => {
    if (userData.intoxicationLevel !== undefined) {
      setAngle((userData.intoxicationLevel / 100) * 180);
    }
  }, [userData.intoxicationLevel]);

  const handleValueChange = (newIntoxicationLevel, newBloodAlcoholLevel) => {
    setUserData((prevData) => ({
      ...prevData,
      intoxicationLevel: newIntoxicationLevel,
      bloodAlcoholLevel: newBloodAlcoholLevel,
    }));
    setAngle((newIntoxicationLevel / 100) * 180);
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
          {userData.intoxicationLevel !== undefined
            ? userData.intoxicationLevel.toFixed(1)
            : 0}
          %
        </p>
        <p className="description">
          혈중 알코올 농도{" "}
          {userData.bloodAlcoholLevel !== undefined
            ? userData.bloodAlcoholLevel.toFixed(2)
            : 0}
          %
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
          />
        ))}
      </div>
    </div>
  );
};

export default CreateContainer2;

// const CreateContainer2 = ({ userData, setUserData }) => {
//   const initialUserData = {
//     name: "",
//     intoxicationLevel: 12.3,
//     bloodAlcoholLevel: 0.02,
//     preferredDrink: "소주",
//   };

//   // 초기 상태 설정
//   useEffect(() => {
//     setUserData(initialUserData);
//     setAngle((initialUserData.intoxicationLevel / 100) * 180);
//   }, []);

//   const [angle, setAngle] = useState(
//     (initialUserData.intoxicationLevel / 100) * 180
//   ); // 각도 설정
//   const [showPopup, setShowPopup] = useState(false); // 팝업 상태
//   const [controlGroups, setControlGroups] = useState([
//     {
//       id: Date.now(),
//       value: 0,
//       drinkType: initialUserData.preferredDrink,
//       volume: initialUserData.preferredDrink === "소주" ? "50ml" : "225ml",
//     },
//   ]);

//   const handleValueChange = (newIntoxicationLevel, newBloodAlcoholLevel) => {
//     // intoxicationLevel 값을 0과 100 사이로 제한
//     const limitedIntoxicationLevel = Math.min(
//       Math.max(newIntoxicationLevel, 0),
//       100
//     );
//     setUserData((prevData) => ({
//       ...prevData,
//       intoxicationLevel: limitedIntoxicationLevel,
//       bloodAlcoholLevel: newBloodAlcoholLevel,
//     }));
//     setAngle((limitedIntoxicationLevel / 100) * 180);
//   };

//   const addControlGroup = () => {
//     setControlGroups([
//       ...controlGroups,
//       {
//         id: Date.now(),
//         value: 0,
//         drinkType: userData.preferredDrink,
//         volume: userData.preferredDrink === "소주" ? "50ml" : "225ml",
//       },
//     ]);
//   };

//   const deleteControlGroup = (id) => {
//     setControlGroups(controlGroups.filter((group) => group.id !== id));
//   };

//   const togglePopup = () => {
//     setShowPopup(!showPopup);
//   };

//   return (
//     <div className="create-container2">
//       <div className="gauge-container">
//         <img src={rainbowGauge} alt="Gauge" className="gauge" />
//         <div
//           className="gauge-needle"
//           style={{ transform: `rotate(${angle}deg)` }}
//         ></div>
//       </div>
//       <div className="value-display">
//         <p className="percentage">{userData.intoxicationLevel.toFixed(1)}%</p>
//         <p className="description">
//           혈중 알코올 농도 {userData.bloodAlcoholLevel.toFixed(2)}%
//           <img
//             src={oing}
//             alt="oing"
//             className="oing"
//             width="18px"
//             onClick={togglePopup}
//           />
//         </p>
//       </div>
//       {showPopup && <Popup onClose={togglePopup} />}
//       <div className="controls">
//         <div className="control-nav">
//           <span>주류</span>
//           <img
//             src={addDrink}
//             alt="addDrink"
//             className="addDrink"
//             width="28px"
//             onClick={addControlGroup}
//           />
//         </div>
//         {controlGroups.map((group) => (
//           <ControlGroup
//             key={group.id}
//             id={group.id}
//             onDelete={deleteControlGroup}
//             onValueChange={handleValueChange}
//             drinkType={group.drinkType}
//             volume={group.volume}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CreateContainer2;
