import React, { useState, useEffect } from "react";
import CalendarL from "react-calendar"; // 캘린더 라이브러리
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "./Calendar.css";
import TopNav from "../components/TopNav"; // 컴포넌트
import BottomNav from "../components/BottomNav";

function Calendar() {
  const [scrolled, setScrolled] = useState(false);
  const [value, setValue] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [drinkingDays, setDrinkingDays] = useState([
    "2024-07-31",
    "2024-08-04",
    "2024-08-13",
  ]);
  const [selectedDate, setSelectedDate] = useState(null);

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
    if (!moment(date).isSame(new Date(), "day")) {
      setSelectedDate(date); // 다른 날짜 클릭 시 calendar-container3 표시
    }
    setValue(date); // 클릭한 날짜를 값으로 설정
  };

  const handleClosePopup = () => {
    setSelectedDate(null); // 팝업창 닫기
  };

  return (
    <div className="MainContainer">
      <TopNav scrolled={scrolled} />
      <div className={`main-page ${scrolled ? "scrolled" : ""}`}>
        <div className="calendar-container">
          <CalendarL
            onChange={handleDateClick}
            value={value}
            calendarType="gregory"
            formatDay={(locale, date) => moment(date).format("DD")}
            tileDisabled={tileDisabled}
            tileClassName={tileClassName}
            tileContent={tileContent}
            onActiveStartDateChange={handleActiveStartDateChange} // 달이 바뀔 때 실행
          />
        </div>
        <div className="calendar-container2">Container 2</div>
      </div>
      {selectedDate && (
        <div className="popup-container">
          <div className="calendar-container3">
            <button onClick={handleClosePopup}>Close</button>
            Container 3
          </div>
        </div>
      )}
      <BottomNav />
    </div>
  );
}

export default Calendar;
