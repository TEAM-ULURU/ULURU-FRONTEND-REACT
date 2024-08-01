// import React from "react";
// import "./BottomNav.css";
// import { Link } from "react-router-dom";
// import home from "../img/Icon/home.png"; //이미지 파일
// import homeS from "../img/Icon/homeSelect.png";
// import calendar from "../img/Icon/calendar.png";
// import calendarS from "../img/Icon/calendarSelect.png";
// import dfriend from "../img/Icon/dfriend.png";
// //import dfriendS from "../img/Icon/dfriendSelect.png";
// import my from "../img/Icon/my.png";
// //import myS from "../img/Icon/mySelect.png";

// const BottomNav = () => {
//   return (
//     <div className="bottom-nav">
//       <Link to="/home" className="nav-item active">
//         <img className="icon" src={homeS} alt="home" width="60" />
//       </Link>
//       <Link to="/calendar" className="nav-item">
//         <img className="icon" src={calendar} alt="calender" width="60" />
//       </Link>
//       <Link to="/friends" className="nav-item">
//         <img className="icon" src={dfriend} alt="frineds" width="60" />
//       </Link>
//       <Link to="/mypage" className="nav-item">
//         <img className="icon" src={my} alt="my" width="60" />
//       </Link>
//     </div>
//   );
// };

// export default BottomNav;

import React from "react";
import "./BottomNav.css";
import { Link, useLocation } from "react-router-dom";
import home from "../img/Icon/home.png"; //이미지 파일
import homeS from "../img/Icon/homeSelect.png";
import calendar from "../img/Icon/calendar.png";
import calendarS from "../img/Icon/calendarSelect.png";
import dfriend from "../img/Icon/dfriend.png";
import dfriendS from "../img/Icon/dfriendSelect.png";
import my from "../img/Icon/my.png";
import myS from "../img/Icon/mySelect.png";

const BottomNav = () => {
  const location = useLocation();

  return (
    <div className="bottom-nav">
      <Link
        to="/home"
        className={`nav-item ${location.pathname === "/home" ? "active" : ""}`}
      >
        <img
          className="icon"
          src={location.pathname === "/home" ? homeS : home}
          alt="home"
          width="60"
        />
      </Link>
      <Link
        to="/calendar"
        className={`nav-item ${
          location.pathname === "/calendar" ? "active" : ""
        }`}
      >
        <img
          className="icon"
          src={location.pathname === "/calendar" ? calendarS : calendar}
          alt="calendar"
          width="60"
        />
      </Link>
      <Link
        to="/friends"
        className={`nav-item ${
          location.pathname === "/friends" ? "active" : ""
        }`}
      >
        <img
          className="icon"
          src={location.pathname === "/friends" ? dfriendS : dfriend}
          alt="friends"
          width="60"
        />
      </Link>
      <Link
        to="/mypage"
        className={`nav-item ${
          location.pathname === "/mypage" ? "active" : ""
        }`}
      >
        <img
          className="icon"
          src={location.pathname === "/mypage" ? myS : my}
          alt="my"
          width="60"
        />
      </Link>
    </div>
  );
};

export default BottomNav;
