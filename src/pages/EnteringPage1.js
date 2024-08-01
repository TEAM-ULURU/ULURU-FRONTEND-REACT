import React, { useState, useEffect } from "react";
import "./EnteringPage1.css";
import { Link } from "react-router-dom";
import back from "../img/back.png"; //이미지 가져오기
import female from "../img/female.png";
import male from "../img/male.png";
import femaleSelected from "../img/clickfemale.png";
import maleSelected from "../img/clickmale.png";

const EnteringPage1 = () => {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const [errors, setErrors] = useState({
    age: "",
    height: "",
    weight: "",
    bodyFat: "",
  });

  useEffect(() => {
    // 나이, 키, 체중 입력 필드가 모두 채워졌는지 확인
    if (
      age &&
      height &&
      weight &&
      !errors.age &&
      !errors.height &&
      !errors.weight &&
      !errors.bodyFat
    ) {
      setIsNextEnabled(true);
    } else {
      setIsNextEnabled(false);
    }
  }, [age, height, weight, errors]);

  const handleGenderClick = (gender) => {
    setSelectedGender(gender);
  };
  const handleInputBlur = (field, value) => {
    if (field === "age") {
      if (value < 18 || value > 120) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          age: "나이는 18세 이상이어야 합니다.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          age: "",
        }));
      }
    }

    if (field === "height") {
      if (value < 100 || value > 250) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          height: "정확한 키를 입력해주세요.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          height: "",
        }));
      }
    }

    if (field === "weight") {
      if (value < 20 || value > 300) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          weight: "정확한 체중을 입력해주세요.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          weight: "",
        }));
      }
    }

    if (field === "bodyFat") {
      if (value < 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          bodyFat: "체지방률은 음수일 수 없습니다.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          bodyFat: "",
        }));
      }
    }
  };

  const handleInputChange = (field, value) => {
    if (field === "age") setAge(value);
    if (field === "height") setHeight(value);
    if (field === "weight") setWeight(value);
    if (field === "bodyFat") setBodyFat(value);
  };

  return (
    <div className="container">
      <div className="header">
        <img
          className="back-button"
          src={back}
          onClick={() => window.history.back()}
        ></img>
        <div className="step-indicator">
          <span className="step active">1</span>
          <span className="step">2</span>
          <span className="step">3</span>
        </div>
        <h2 className="title">
          al-T 를 시작하기 위해 <br></br>기본 정보를 알려주세요
        </h2>
      </div>
      <div className="content1">
        <div className="genderSection">
          <p className="label">성별</p>
          <div className="gender-selection">
            <div
              className="gender-option"
              onClick={() => handleGenderClick("female")}
            >
              <img
                src={selectedGender === "female" ? femaleSelected : female}
                alt="Female"
              />
              <p>여성</p>
            </div>
            <div
              className="gender-option"
              onClick={() => handleGenderClick("male")}
            >
              <img
                src={selectedGender === "male" ? maleSelected : male}
                alt="Male"
              />
              <p>남성</p>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="input-group">
            <label>나이(*)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                onBlur={(e) => handleInputBlur("age", e.target.value)}
              />

              <span className="unit">세</span>
            </div>
            {errors.age && <span className="error">{errors.age}</span>}
          </div>

          <div className="input-group">
            <label>키(*)</label>
            <div className="input-wrapper">
              <input
                type="number"
                step="0.1"
                value={height}
                onChange={(e) => handleInputChange("height", e.target.value)}
                onBlur={(e) => handleInputBlur("height", e.target.value)}
              />
              <span className="unit">cm</span>
            </div>
            {errors.height && <span className="error">{errors.height}</span>}
          </div>
        </div>

        <div className="section">
          <div className="input-group">
            <label>체중(*)</label>
            <div className="input-wrapper">
              <input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => handleInputChange("weight", e.target.value)}
                onBlur={(e) => handleInputBlur("weight", e.target.value)}
              />
              <span className="unit">kg</span>
            </div>
            {errors.weight && <span className="error">{errors.weight}</span>}
          </div>
          <div className="input-group">
            <label>체지방률</label>
            <div className="input-wrapper">
              <input
                type="number"
                step="0.1"
                value={bodyFat}
                onChange={(e) => handleInputChange("bodyFat", e.target.value)}
                onBlur={(e) => handleInputBlur("bodyFat", e.target.value)}
              />
              <span className="unit">%</span>
            </div>
            {errors.bodyFat && <span className="error">{errors.bodyFat}</span>}
          </div>
        </div>
      </div>
      <Link to="/entering-page-2">
        <button
          className={`next-button ${isNextEnabled ? "enabled" : "disabled"}`}
          disabled={!isNextEnabled}
        >
          다음
        </button>
      </Link>
    </div>
  );
};

export default EnteringPage1;
