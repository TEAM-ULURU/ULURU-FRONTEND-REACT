import React, { useState, useEffect } from "react";
import "./Friends.css";
import TopNav from "../components/TopNav";
import BottomNav from "../components/BottomNav";

function Friend() {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    //리터문 시작
    <div className="MainContainer">
      <TopNav scrolled={scrolled} />
      <div className={`main-page ${scrolled ? "scrolled" : ""}`}></div>
      <BottomNav></BottomNav>
    </div>
  );
}

export default Friend;
