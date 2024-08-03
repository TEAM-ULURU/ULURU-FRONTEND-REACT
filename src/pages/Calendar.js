import React, { useState, useEffect, useRef } from "react";
import CalendarL from "react-calendar"; // 캘린더 라이브러리
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "moment/locale/ko"; // 한국어 로케일 가져오기
import "./Calendar.css";
import TopNav from "../components/TopNav"; // 컴포넌트
import BottomNav from "../components/BottomNav";
import CalContainer2 from "../components/CalContainer2";
import CalContainer3 from "../components/CalContainer3";
import closeIcon from "../img/Icon/closeIcon.png"; //이미지

moment.locale("ko"); // moment를 한국어 로케일로 설정

function Calendar() {
  const [scrolled, setScrolled] = useState(false);
  const [value, setValue] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [drinkingDays, setDrinkingDays] = useState([
    "2024-07-05",
    "2024-07-10",
    "2024-07-15",
    "2024-07-26",
    "2024-07-29",
    "2024-07-30",
    "2024-08-02",
  ]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [popupHeight, setPopupHeight] = useState(0);
  const calendarRef = useRef(null);
  const popupRef = useRef(null);
  const isResizing = useRef(false);

  // 예시 데이터: 각 날짜에 대한 정보
  const dateData = {
    "2024-08-02": {
      percentage: 70.23,
      alcoholLevel: 0.14,
      drinkType: "소주",
      bottleAmount: 1.33,
      mlAmount: 479,
      friends: [
        { name: "김성무", percentage: 33.3, count: 2 },
        { name: "김나영", percentage: 66.6, count: 1 },
        { name: "강찬욱", percentage: 11.44, count: 4 },
      ],
    },
    "2024-07-30": {
      percentage: 50.7,
      alcoholLevel: 0.1,
      drinkType: "소주,맥주",
      bottleAmount: 2.7,
      mlAmount: 1050,
      friends: [
        { name: "이가영", percentage: 20.0, count: 3 },
        { name: "서재흥", percentage: 40.0, count: 1 },
        { name: "이다민", percentage: 66.7, count: 2 },
      ],
    },
    "2024-07-29": {
      percentage: 10.0,
      alcoholLevel: 0.01,
      drinkType: "맥주",
      bottleAmount: 2,
      mlAmount: 1000,
      friends: [],
    },
    "2024-07-26": {
      percentage: 26.7,
      alcoholLevel: 0.08,
      drinkType: "소주",
      bottleAmount: 2,
      mlAmount: 1000,
      friends: [{ name: "이가영", percentage: 89.2, count: 3 }],
    },
    // 다른 날짜 데이터 추가...
  };

  useEffect(() => {
    console.log("Drinking days:", drinkingDays);
  }, [drinkingDays]);

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
    if (selectedDate) {
      const selectedTile = document.querySelector(
        ".react-calendar__tile--active"
      );
      if (selectedTile) {
        const tileRect = selectedTile.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const height = viewportHeight - tileRect.bottom - 15;
        setPopupHeight(height);
      }
    }
  }, [selectedDate]);

  const startResizing = (e) => {
    e.preventDefault();
    isResizing.current = true;
    window.addEventListener("mousemove", handleResize);
    window.addEventListener("mouseup", stopResizing);
  };

  const handleResize = (e) => {
    if (isResizing.current && popupRef.current) {
      const viewportHeight = window.innerHeight;
      const newHeight = viewportHeight - e.clientY;
      setPopupHeight(newHeight);
    }
  };

  const stopResizing = () => {
    isResizing.current = false;
    window.removeEventListener("mousemove", handleResize);
    window.removeEventListener("mouseup", stopResizing);
  };

  useEffect(() => {
    const handlePopupScroll = () => {
      if (popupRef.current) {
        const scrollTop = popupRef.current.scrollTop;
        const scrollHeight = popupRef.current.scrollHeight;
        const clientHeight = popupRef.current.clientHeight;
        const newHeight = Math.min(scrollHeight, clientHeight + scrollTop);
        setPopupHeight(newHeight);
      }
    };

    if (popupRef.current) {
      popupRef.current.addEventListener("scroll", handlePopupScroll);
    }

    return () => {
      if (popupRef.current) {
        popupRef.current.removeEventListener("scroll", handlePopupScroll);
      }
    };
  }, []);

  const tileDisabled = ({ date, view }) => {
    if (view === "month") {
      return date.getMonth() !== activeStartDate.getMonth();
    }
    return false;
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month" && date.getDay() === 0) {
      return "sunday"; // 일요일인 타일에 추가할 클래스 이름
    }
    if (view === "month" && date.getMonth() !== activeStartDate.getMonth()) {
      return "disabled-tile"; // 비활성화된 타일에 추가할 클래스 이름
    }
    if (view === "month" && moment(date).isSame(new Date(), "day")) {
      return "today"; // 현재 날짜 타일에 추가할 클래스 이름
    }
    if (
      view === "month" &&
      selectedDate &&
      moment(date).isSame(selectedDate, "day")
    ) {
      return "dselected"; // 선택한 날짜 타일에 추가할 클래스 이름
    }
    return "";
  };

  const tileContent = ({ date, view }) => {
    const dateString = moment(date).format("YYYY-MM-DD");
    if (view === "month" && date.getMonth() === activeStartDate.getMonth()) {
      return (
        <div className="tile-wrapper">
          <div>
            {drinkingDays.includes(dateString) && <div className="dot"></div>}
          </div>
        </div>
      );
    }
    return null;
  };

  const handleActiveStartDateChange = ({ activeStartDate }) => {
    setActiveStartDate(activeStartDate);
  };

  const handleDateClick = (date) => {
    if (moment(date).isSame(new Date(), "day")) {
      setSelectedDate(date); // 현재 날짜 클릭 시 calendar-container3 닫기는 null // 안닫기로 변경
    } else {
      setSelectedDate(date); // 다른 날짜 클릭 시 calendar-container3 표시
    }
    setValue(date); // 클릭한 날짜를 값으로 설정
  };

  const handleClosePopup = () => {
    setSelectedDate(null); // 팝업창 닫기
    setPopupHeight(0); // 팝업 높이 초기화
  };

  const getDefaultData = () => {
    return {
      percentage: 0,
      alcoholLevel: 0,
      drinkType: "소주/맥주",
      bottleAmount: 0,
      mlAmount: 0,
      friends: [],
    };
  };

  const getSelectedDateData = () => {
    const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
    return dateData[formattedDate] || getDefaultData();
  };

  return (
    <div className="MainContainer">
      <TopNav scrolled={scrolled} />
      <div className={`main-page ${scrolled ? "scrolled" : ""}`}>
        <div className="calendar-container" ref={calendarRef}>
          <CalendarL
            onChange={handleDateClick}
            value={value}
            calendarType="gregory"
            formatDay={(locale, date) => moment(date).format("D")}
            tileDisabled={tileDisabled}
            tileClassName={tileClassName}
            tileContent={tileContent}
            onActiveStartDateChange={handleActiveStartDateChange} // 달이 바뀔 때 실행
          />
        </div>
        <div className="calendar-container2">
          <CalContainer2 />
        </div>
      </div>
      {selectedDate && (
        <div
          className="popup-container"
          style={{ height: `${popupHeight}px` }}
          ref={popupRef}
        >
          <div className="resize-wrapper" onMouseDown={startResizing}>
            <div className="resize-handle"></div>
          </div>
          <div className="calendar-container3">
            <div className="cc3-first">
              <span className="today-number">
                {moment(selectedDate).format("M월 D일 dddd")}
              </span>

              <img
                className="closebutton"
                src={closeIcon}
                onClick={handleClosePopup}
                width="15px"
                alt="close"
              ></img>
            </div>
            <CalContainer3 data={getSelectedDateData()} />
          </div>
        </div>
      )}
      <BottomNav />
    </div>
  );
}

export default Calendar;
