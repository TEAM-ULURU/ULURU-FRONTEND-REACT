import React, { useState, useEffect } from "react";
import "./EnteringPage2.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import back from "../img/back.png"; // 이미지 가져오기
import addRefer from "../img/addRefer.png";

const EnteringPage2 = () => {
  const [drinkingFrequency, setDrinkingFrequency] = useState("");
  const [preferredType, setPreferredType] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [intoxicationLevel, setIntoxicationLevel] = useState("");
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [drinkingPeriod, setDrinkingPeriod] = useState("1개월 기준");
  const [quantityPeriod, setQuantityPeriod] = useState("1시간 기준");
  const [levelPeriod, setLevelPeriod] = useState("0");
  const [isInputCompleted, setIsInputCompleted] = useState({
    drinkingFrequency: false,
    quantity: false,
    intoxicationLevel: false,
  });
  const [errors, setErrors] = useState({
    drinkingFrequency: "",
    quantity: "",
    intoxicationLevel: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // 모든 입력 필드가 채워졌고, 오류가 없는지 확인
    if (
      drinkingFrequency &&
      preferredType &&
      quantity &&
      intoxicationLevel &&
      !errors.drinkingFrequency &&
      !errors.quantity &&
      !errors.intoxicationLevel
    ) {
      setIsNextEnabled(true);
    } else {
      setIsNextEnabled(false);
    }
  }, [drinkingFrequency, preferredType, quantity, intoxicationLevel, errors]);

  const handlePreferredTypeClick = (type) => {
    setPreferredType(type);
  };

  const handleInputChange = (field, value) => {
    if (value < 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "값은 0보다 작을 수 없습니다.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "",
      }));
    }

    if (field === "drinkingFrequency") setDrinkingFrequency(value);
    if (field === "quantity") setQuantity(value);
    if (field === "intoxicationLevel") setIntoxicationLevel(value);

    setIsInputCompleted((prevState) => ({
      ...prevState,
      [field]: value !== "",
    }));
  };

  const handleSubmit = async () => {
    const data = {
      drinking_frequency: drinkingFrequency, //기준값당 음주횟수
      type_of_alcohol: preferredType, //선호주종
      number_of_bottles: quantity, //기준값당 마시는양
      percent_per_reference_value: intoxicationLevel, //기준값당 취하는 정도
      drinking_frequency_reference_value: drinkingPeriod, //음주횟수 기준값
      average_alcohol_intake: quantityPeriod, //마시는 양 기준값
      degree_of_intoxication: levelPeriod, //취하는정도 기준값
      is_oauth: false,
    };

    try {
      const response = await axios.post(
        "https://brave-ariela-davidlee-c2a7ce37.koyeb.app/save_members/",
        data,
        {
          params: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJfaWQiOiIyIn0.aPB-Qp1wQeRvV_w4x_-bPINB6QBEgWDPjOb8Uo7g_o8",
          },
          // headers: {
          //   Authorization:
          //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJfaWQiOiIyIn0.LCs8i14oI3Np72aqi7QGibqmgJaqXiHaGoZZac1pVEA",
          // },
        }
      );
      console.log("설문2 전송성공");
      if (response.status === 200) {
        // 성공적인 응답 처리
        navigate("/entering-page-3");
      } else {
        // 오류 응답 처리
        console.error("데이터 제출 실패");
      }
    } catch (error) {
      console.error("오류 발생:", error);
      // 백엔드 연결이 안되어 있을 경우 바로 다음 페이지로 이동
      //navigate("/entering-page-3");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <img
          className="back-button"
          src={back}
          onClick={() => window.history.back()}
          alt="뒤로가기"
        ></img>
        <div className="step-indicator">
          <span className="step">1</span>
          <span className="step active">2</span>
          <span className="step">3</span>
        </div>
        <h2 className="title">
          권장 음주량 측정을 위해<br></br>음주 경험을 공유해주세요
        </h2>
      </div>
      <div className="content">
        <div className="section1">
          <div className="input-group">
            <label className="p2label">음주 빈도</label>
            <input
              className="middleInput"
              placeholder="0"
              type="number"
              value={drinkingFrequency}
              onChange={(e) =>
                handleInputChange("drinkingFrequency", e.target.value)
              }
            />
            <span className="unit1">회</span>
            <select
              className={`refer ${
                isInputCompleted.drinkingFrequency ? "completed" : ""
              }`}
              value={drinkingPeriod}
              onChange={(e) => setDrinkingPeriod(e.target.value)}
            >
              <option value="1개월 기준">1개월 기준</option>
              <option value="1주일 기준">1주일 기준</option>
              <option value="2주일 기준">2주일 기준</option>
              <option value="1일 기준">1일 기준</option>
            </select>
          </div>
          {errors.drinkingFrequency && (
            <span className="error">{errors.drinkingFrequency}</span>
          )}
          <div className="input-group">
            <label className="p2label">선호하는 주종</label>
            <div
              className={`drinkselect ${
                preferredType === "소주" ? "selected" : ""
              }`}
              onClick={() => handlePreferredTypeClick("소주")}
            >
              소주
            </div>
            <div
              className={`drinkselect ${
                preferredType === "맥주" ? "selected" : ""
              }`}
              onClick={() => handlePreferredTypeClick("맥주")}
            >
              맥주
            </div>
            {/* <div
              className={`drinkselect ${
                preferredType === "기타" ? "selected" : ""
              }`}
              onClick={() => setPreferredType("기타")}
            >
              기타
            </div> */}
          </div>

          {preferredType && (
            <div className="image-container">
              <img
                style={{
                  marginLeft: "35px",
                  width: "350px",
                  marginBottom: "10px",
                }}
                src={addRefer}
                alt="Drink"
                className="drink-image"
              />
            </div>
          )}

          <div className="input-group">
            <label className="p2label">술자리 평균 주류 섭취량</label>
            <input
              className="middleInput"
              placeholder="0"
              step="0.5"
              type="number"
              value={quantity}
              onChange={(e) => handleInputChange("quantity", e.target.value)}
            />
            <span className="unit1">병</span>
            <select
              className={`refer ${
                isInputCompleted.quantity ? "completed" : ""
              }`}
              value={quantityPeriod}
              onChange={(e) => setQuantityPeriod(e.target.value)}
            >
              <option value="1시간 기준">1시간 기준</option>
              <option value="2시간 기준">2시간 기준</option>
              <option value="3시간 기준">3시간 기준</option>
              <option value="4시간 기준">4시간 기준</option>
            </select>
          </div>
          {errors.quantity && <span className="error">{errors.quantity}</span>}
          <div className="input-group">
            <label className="p2label">취하는 정도</label>
            <input
              className="middleInput"
              placeholder="0"
              type="number"
              value={intoxicationLevel}
              onChange={(e) =>
                handleInputChange("intoxicationLevel", e.target.value)
              }
            />
            <span className="unit1">%</span>
            <select
              className={`refer ${
                isInputCompleted.intoxicationLevel ? "completed" : ""
              }`}
              value={levelPeriod}
              onChange={(e) => setLevelPeriod(e.target.value)}
            >
              <option value="1병 기준">1병 기준</option>
              <option value="2병 기준">2병 기준</option>
              <option value="3병 기준">3병 기준</option>
              <option value="4병 기준">4병 기준</option>
            </select>
          </div>
          {errors.intoxicationLevel && (
            <span className="error">{errors.intoxicationLevel}</span>
          )}
        </div>
        {/* 추가 공간을 위한 div */}
        <div className="spacer"></div>
      </div>
      <button
        className={`next-button ${isNextEnabled ? "enabled" : "disabled"}`}
        disabled={!isNextEnabled}
        onClick={handleSubmit}
      >
        다음
      </button>
    </div>
  );
};

export default EnteringPage2;
