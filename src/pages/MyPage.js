import React, { useState, useEffect } from "react";
import "./MyPage.css";
import TopNav from "../components/TopNav";
import BottomNav from "../components/BottomNav";
import whiteCircle from "../img/Icon/whiteCircle.png"; // 이미지 파일 가져오기
import mycharFe from "../img/mycharFe.png";
import mycharMale from "../img/mycharMale.png";
import logout from "../img/Icon/logout.png";
import myEdit from "../img/Icon/myEdit.png";
import accDel from "../img/Icon/accDel.png";
import minigoogle from "../img/Login/minigoogle.png";
import minikakao from "../img/Login/minikakao.png";
import closeIcon from "../img/Icon/closeIcon.png";
import axios from "axios";

function MyPage() {
  const [scrolled, setScrolled] = useState(false);
  const [userInfo, setUserInfo] = useState({
    emailType: "kakao",
    age: "23",
    gender: "남성",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({ ...userInfo });
  const [errors, setErrors] = useState({});
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("Access token이 존재하지 않습니다.");
        return; // 토큰이 없으면 API 호출을 하지 않음
      }

      const response = await axios.get("https://alt-backend.com/api/my-page/get-info", {
        headers: {
          Authorization: token,
        },
      });

      setUserInfo(response.data.object); // API에서 받아온 사용자 정보를 설정
      setFormValues(response.data.object); // 가져온 사용자 정보를 폼 값으로 설정
    } catch (error) {
      console.error("사용자 정보를 가져오는 데 오류가 발생했습니다:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.querySelector(".main-page").scrollTop;
      if (scrollTop > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const mainPage = document.querySelector(".main-page");
    mainPage.addEventListener("scroll", handleScroll);

    return () => {
      mainPage.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  useEffect(() => {
    // 모든 오류 상태를 확인하여 isSaveDisabled 상태를 업데이트
    const hasErrors = Object.values(errors).some((error) => error !== "");
    setIsSaveDisabled(hasErrors);
  }, [errors]);

  const characterImage = userInfo.gender === "Male" ? mycharMale : mycharFe;
  const emailTypeIcon = userInfo.emailType === "kakao" ? minikakao : minigoogle;

  const openModal = () => {
    setIsModalOpen(true);
    setFormValues({ ...userInfo });
    setErrors({});
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = "";

    switch (name) {
      case "age":
        if (value < 18 || value > 120) {
          error = "18세 이상이어야 합니다.";
        }
        break;
      case "height":
        if (value < 100 || value > 250) {
          error = "정확한 값을 입력해주세요.";
        }
        break;
      case "weight":
        if (value < 20 || value > 300) {
          error = "정확한 값을 입력해주세요.";
        }
        break;
      case "bodyFat":
        if (value && value < 0) {
          error = "0 이상으로 입력해주세요.";
        }
        break;
      case "emergencyContact":
        let formattedValue = value;
        if (/^\d{8}$/.test(value)) {
          formattedValue = `010-${value.slice(0, 4)}-${value.slice(4)}`;
        } else if (/^\d{11}$/.test(value)) {
          formattedValue = `${value.slice(0, 3)}-${value.slice(
            3,
            7
          )}-${value.slice(7)}`;
        }
        if (!/^010-\d{4}-\d{4}$/.test(formattedValue)) {
          error = "8자리나 11자리 유효한 숫자를 입력해주세요.";
        }
        setFormValues({ ...formValues, emergencyContact: formattedValue });
        break;
      default:
        break;
    }

    setErrors({ ...errors, [name]: error });
  };

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setFormValues({ ...formValues, address: data.address });
      },
    }).open();
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("Access token이 존재하지 않습니다.");
        return; // 토큰이 없으면 API 호출을 하지 않음
      }
      console.info(formValues);

      // 사용자가 수정한 정보를 백엔드로 전송
      await axios.put(
        "https://alt-backend.com/api/my-page/update", // 사용자 정보를 업데이트할 API URL
        formValues, // 수정된 사용자 정보
        {
          headers: {
            Authorization: token, // Authorization 헤더에 토큰 추가
          },
        }
      );

      // API 호출이 성공하면 사용자 정보를 다시 가져와서 최신 상태로 유지
      
      await fetchUserInfo();
      closeModal(); // 모달 닫기
		
    } catch (error) {
      console.error("사용자 정보를 업데이트하는 데 오류가 발생했습니다:", error);
    }
  };

  return (
    <div className="MainContainer">
      <TopNav scrolled={scrolled} />
      <div className={`main-page ${scrolled ? "scrolled" : ""}`}>
        <div className="myp-container">
          <img
            className="whiteCircle"
            src={whiteCircle}
            width="120px"
            alt="프로필 배경"
          />
          <img className="character" src={characterImage} alt="캐릭터" />
          <div className="user-info">
            <p className="mne">
              {userInfo.name}{" "}
              <img
                className="myEI"
                src={myEdit}
                alt="편집"
                onClick={openModal}
              />
            </p>
            <p className="et">
              {userInfo.email}
              <img
                className="email-type-icon"
                src={emailTypeIcon}
                alt="이메일 종류"
              />
            </p>
          </div>
          <div className="mybasic-info">
            <div className="mymt">기본 정보</div>
            <p>{`${userInfo.gender} / ${userInfo.age}세 / ${userInfo.height} cm / ${userInfo.weight} kg / ${userInfo.bodyFat}%`}</p>
          </div>
          <div className="myaddress">
            <div className="mymt">주소</div>
            <p>{userInfo.address},</p>
            <p>{userInfo.addressDetail}</p>
          </div>
          <div className="myemergency-contact">
            <div className="mymt">비상연락처</div>
            <p>{userInfo.emergencyContact}</p>
          </div>
        </div>
        {isModalOpen && (
          <div className="infoEdit-overlay">
            <div className="infoEdit">
              <img
                src={closeIcon}
                className="myclose"
                onClick={closeModal}
                alt="닫기"
              />
              <h2>정보 수정</h2>
              <span className="agett">나이 </span>
              <span className="kitt">키</span>
              <div className="naiki">
                <div className="myitem1">
                  <input
                    type="number"
                    name="age"
                    value={formValues.age}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="00"
                  />
                  <span className="myunit">세</span>
                  {errors.age && (
                    <div className="error-message">{errors.age}</div>
                  )}
                </div>
                <div className="myitem2">
                  <input
                    type="number"
                    name="height"
                    value={formValues.height}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="000"
                  />
                  <span className="myunit">cm</span>
                  {errors.height && (
                    <div className="error-message">{errors.height}</div>
                  )}
                </div>
              </div>
              <span className="weighttt">체중 </span>
              <span className="jibangtt">체지방률</span>
              <div className="chaechae">
                <div className="myitem1">
                  <input
                    type="number"
                    name="weight"
                    value={formValues.weight}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="00"
                  />
                  <span className="myunit">kg</span>
                  {errors.weight && (
                    <div className="error-message">{errors.weight}</div>
                  )}
                </div>
                <div className="myitem2">
                  <input
                    type="number"
                    name="bodyFat"
                    value={formValues.bodyFat}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="00"
                  />
                  <span className="myunit">%</span>
                  {errors.bodyFat && (
                    <div className="error-message">{errors.bodyFat}</div>
                  )}
                </div>
              </div>
              <span className="addresstt">주소</span>
              <div className="asg">
                <div className="myitem">
                  <input
                    className="myaddress"
                    type="text"
                    name="address"
                    value={formValues.address}
                    onChange={handleChange}
                    placeholder="주소"
                  />
                </div>
                <button className="asb" onClick={handleAddressSearch}>
                  주소 검색
                </button>
              </div>
              <div>
                <input
                  type="text"
                  name="addressDetail"
                  value={formValues.addressDetail}
                  onChange={handleChange}
                  placeholder="상세주소"
                />
              </div>
              <span className="emnumbertt">비상연락처</span>
              <div className="myitem">
                <input
                  type="text"
                  name="emergencyContact"
                  value={formValues.emergencyContact}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="010-0000-0000 (-없이)"
                />
                {errors.emergencyContact && (
                  <div className="error-message">{errors.emergencyContact}</div>
                )}
              </div>
              <div className="button-container">
                <input
                  type="button"
                  value="완료"
                  onClick={handleSave}
                  disabled={isSaveDisabled}
                />
              </div>
            </div>
          </div>
        )}
        <img className="logout" src={logout} alt="로그아웃" />
        <img className="accDel" src={accDel} alt="계정 삭제" />
      </div>
      <BottomNav />
    </div>
  );
}

export default MyPage;
