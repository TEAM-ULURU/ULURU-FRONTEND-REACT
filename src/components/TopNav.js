import React from "react";
import "./TopNav.css";
import { Link } from "react-router-dom";
import topLogo from "../img/Icon/topLogo.png"; // 로고 이미지 파일
import notifyred from "../img/Icon/notifyred.png";
import notify from "../img/Icon/notify.png"; // 알림 아이콘 파일
import setting from "../img/Icon/setting.png"; // 설정 아이콘 파일

const handleRefresh = () => {
  window.location.reload();
};

const TopNav = ({ scrolled }) => {
  return (
    <div className={`top-nav ${scrolled ? "scrolled" : ""}`}>
      <img
        src={topLogo}
        alt="Logo"
        className="top-logo"
        onClick={handleRefresh}
      />
      <div className="top-icons">
        <img src={notifyred} alt="Notification" className="top-icon" />
        <img src={setting} alt="Settings" className="top-icon" />
      </div>
    </div>
  );
};

export default TopNav;
