import React, { useState, useEffect } from "react";
import "./Friends.css";
import axios from "axios";
import TopNav from "../components/TopNav"; //컴포넌트 가져오기
import BottomNav from "../components/BottomNav";
import whiteCheck from "../img/Icon/whiteCheck.png"; //이미지 가져오기
import blackCheck from "../img/Icon/blackCheck.png";
import withIcon from "../img/Icon/withIcon.png";
import drinkCup from "../img/Icon/drinkCup.png";
import codeTransfer from "../img/Icon/codeTransfer.png";
import codeTransferS from "../img/Icon/codeTransferS.png";
import addFriend from "../img/Icon/addFriend.png";

function Friend() {
  const [scrolled, setScrolled] = useState(false);
  const [friends, setFriends] = useState([
    { name: "강찬욱", drinksThisWeek: 2, drinksTogether: 4, checked: false },
    { name: "김나영", drinksThisWeek: 2, drinksTogether: 1, checked: false },
    { name: "이다민", drinksThisWeek: 4, drinksTogether: 2, checked: false },
    { name: "서재흥", drinksThisWeek: 1, drinksTogether: 3, checked: false },
    { name: "이가영", drinksThisWeek: 1, drinksTogether: 0, checked: false },
  ]);
  const [mostTogether, setMostTogether] = useState({
    name: "강찬욱",
    drinksThisWeek: 2,
    drinksTogether: 4,
  });
  const [mostThisWeek, setMostThisWeek] = useState({
    name: "이다민",
    drinksThisWeek: 4,
    drinksTogether: 2,
  });

  const [transferStatus, setTransferStatus] = useState("");

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
    // 백엔드에서 친구 데이터를 가져오기
    /*
    axios
      .get("/api/friends")
      .then((response) => {
        const data = response.data.map((friend) => ({
          ...friend,
          checked: false,
        }));
        setFriends(data);
        if (data.length > 0) {
          // 가장 많이 함께한 친구
          const mostTogetherFriend = data.reduce((max, friend) =>
            friend.drinksTogether > max.drinksTogether ? friend : max
          );
          setMostTogether(mostTogetherFriend);

          // 이번 주에 가장 많이 마신 친구
          const mostThisWeekFriend = data.reduce((max, friend) =>
            friend.drinksThisWeek > max.drinksThisWeek ? friend : max
          );
          setMostThisWeek(mostThisWeekFriend);
        }
      })
      .catch((error) => {
        console.error("Error fetching friends data:", error);
      });
    */
  }, []);

  const toggleCheck = (index) => {
    const newFriends = [...friends];
    newFriends[index].checked = !newFriends[index].checked;
    setFriends(newFriends);
  };

  const handleCodeTransferClick = () => {
    const selectedFriends = friends.filter((friend) => friend.checked);

    if (selectedFriends.length === 0) {
      return;
    } else {
      console.log(selectedFriends);
      setTransferStatus("전송 완료 ✔️");
      setTimeout(() => setTransferStatus(""), 1000); // 3초 후 알림 메시지 숨기기
    }

    /*
    axios
      .post("/api/transfer", { friends: selectedFriends })
      .then((response) => {
        console.log("Data sent successfully");
        setTransferStatus("전송되었습니다!");
        setTimeout(() => setTransferStatus(""), 3000); // 3초 후 알림 메시지 숨기기
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
    */
  };

  const hasBlackCheck = friends.some((friend) => friend.checked);

  return (
    <div className="MainContainer">
      <TopNav scrolled={scrolled} />
      <div className={`main-page ${scrolled ? "scrolled" : ""}`}>
        <div className="df-container1">
          <p>친구 목록</p>
          <ul className="dfriends-list">
            {friends.map((friend, index) => (
              <li key={index} className="friend-item">
                <img
                  className="checkIcon"
                  src={friend.checked ? blackCheck : whiteCheck}
                  width="25px"
                  onClick={() => toggleCheck(index)}
                  alt="check"
                />
                <span className="dfriend-name">{friend.name}</span>
                <span className="dfriend-stats">
                  <img
                    className="drinkCup"
                    src={drinkCup}
                    width="20px"
                    height="20px"
                    alt="drink"
                  />
                  <span className="drinks-this-week">
                    {friend.drinksThisWeek}
                  </span>
                  <img
                    className="withIcon"
                    src={withIcon}
                    width="25px"
                    alt="with"
                  />
                  <span className="drinks-together">
                    {friend.drinksTogether}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <div className="fd-button">
            <img
              className={`codeTransfer ${
                hasBlackCheck ? "cursor-pointer" : ""
              }`}
              src={hasBlackCheck ? codeTransferS : codeTransfer}
              width="170px"
              onClick={hasBlackCheck ? handleCodeTransferClick : null}
              alt="transfer"
            />
            <img
              className="addFriend"
              src={addFriend}
              width="170px"
              alt="add"
            />
          </div>
          {transferStatus && (
            <p className="transfer-status">{transferStatus}</p>
          )}
        </div>
        <div className="df-container2">
          <div className="friend-info">
            <p className="friend-info-title">가장 많이 같이</p>
            {mostTogether && (
              <>
                <p className="friend-info-name">{mostTogether.name}</p>
                <p className="friend-info-detail">
                  같이한 술자리 {mostTogether.drinksTogether}회
                </p>
              </>
            )}
          </div>
          <div
            className="df-middleLine"
            style={{
              width: "2px",
              height: "145px",
              backgroundColor: "#CECECE",
            }}
          ></div>
          <div className="friend-info">
            <p className="friend-info-title">이번주에 가장 많이</p>
            {mostThisWeek && (
              <>
                <p className="friend-info-name">{mostThisWeek.name}</p>
                <p className="friend-info-detail">
                  최근 7일간 {mostThisWeek.drinksThisWeek}회 음주
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default Friend;
