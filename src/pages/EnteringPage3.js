import React, { useState, useEffect } from "react";
import "./EnteringPage3.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import back from "../img/back.png"; // 이미지 가져오기

const EnteringPage3 = () => {
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [contact, setContact] = useState("");
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [errors, setErrors] = useState({
    address: "",
    detailAddress: "",
    contact: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // 모든 입력 필드가 채워졌는지 확인
    if (
      address &&
      detailAddress &&
      contact &&
      !errors.address &&
      !errors.detailAddress &&
      !errors.contact
    ) {
      setIsNextEnabled(true);
    } else {
      setIsNextEnabled(false);
    }
  }, [address, detailAddress, contact, errors]);

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setAddress(data.address);
      },
    }).open();
  };

  const handleContactBlur = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 추출
    if (value.length === 8) {
      setContact(`010-${value.slice(0, 4)}-${value.slice(4)}`);
      setErrors((prevErrors) => ({ ...prevErrors, contact: "" }));
    } else if (value.length === 11 && value.startsWith("010")) {
      setContact(`${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`);
      setErrors((prevErrors) => ({ ...prevErrors, contact: "" }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contact: "유효한 전화번호를 입력해주세요 (8자리 또는 11자리 숫자)",
      }));
    }
  };

  useEffect(() => {
    // Daum Postcode script를 동적으로 로드
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async () => {
    //백엔드 연결코드
    const data = {
      street_name_address: address,
      detail_address: detailAddress,
      emergency_contact: contact,
      is_oauth: 1,
    };

    try {
	  const token = localStorage.getItem("accessToken");
	console.info(token.substring(7));
      const response = await axios.post(
        "https://brave-ariela-davidlee-c2a7ce37.koyeb.app/save_members",
        data,
        {
          params: {
            token:
              token.substring(7),
          },
          // headers: {
          //   Authorization:
          //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJfaWQiOiIyIn0.LCs8i14oI3Np72aqi7QGibqmgJaqXiHaGoZZac1pVEA",
          // },
        }
      );
      console.log("설문3 전송성공");
      if (response.status === 200) {
        // 성공적인 응답 처리
        navigate("/home");
      } else {
        // 오류 응답 처리
        console.error("데이터 제출 실패");
        navigate("/home");
      }
    } catch (error) {
      console.error("오류 발생:", error);
      // 백엔드 연결이 안되어 있을 경우 바로 다음 페이지로 이동
      navigate("/home");
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
          <span className="step">2</span>
          <span className="step active">3</span>
        </div>
        <h2 className="title">
          안전 귀가 서비스를 위해
          <br></br>주소와 연락처를 알려주세요
        </h2>
      </div>

      <div className="content">
        <div className="section1">
          <div className="input-group">
            <label className="p3label">주소</label>
            <input
              className="addressInput"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button className="address-search" onClick={handleAddressSearch}>
              주소 검색
            </button>
            {errors.address && <span className="error">{errors.address}</span>}
          </div>
          <div className="input-group">
            <input
              className="addressInput2"
              placeholder="상세주소를 입력해주세요"
              type="text"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
            />
            {errors.detailAddress && (
              <span className="error">{errors.detailAddress}</span>
            )}
          </div>
          <div className="input-group">
            <label className="p3label">비상연락처</label>
            <input
              className="EmergencyInput"
              placeholder="010-0000-0000 ( - 없이)"
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              onBlur={handleContactBlur}
            />
            {errors.contact && <span className="error">{errors.contact}</span>}
          </div>
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

export default EnteringPage3;
