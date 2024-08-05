import React, { useState, useEffect } from "react";
import "./Friends.css";
import axios from "axios";
import TopNav from "../components/TopNav"; // 컴포넌트 가져오기
import BottomNav from "../components/BottomNav";
import whiteCheck from "../img/Icon/whiteCheck.png"; // 이미지 가져오기
import blackCheck from "../img/Icon/blackCheck.png";
import withIcon from "../img/Icon/withIcon.png";
import drinkCup from "../img/Icon/drinkCup.png";
import codeTransfer from "../img/Icon/codeTransfer.png";
import codeTransferS from "../img/Icon/codeTransferS.png";
import addFriend from "../img/Icon/addFriend.png";
import AddFriendModal from "../components/AddFriendModal"; // AddFriendModal 컴포넌트 가져오기

function Friend() {
  const [scrolled, setScrolled] = useState(false);
  const [friends, setFriends] = useState([]);
  const [mostTogether, setMostTogether] = useState(null);
  const [mostThisWeek, setMostThisWeek] = useState(null);
  const [transferStatus, setTransferStatus] = useState("");
  const [showAddFriendModal, setShowAddFriendModal] = useState(false); // 친구 추가 모달 상태 추가

  const fetchFriends = async () => {
    try {
      const response = await axios.get(
        "http://ec2-18-116-81-21.us-east-2.compute.amazonaws.com:8080/api/friend/get-info",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicm9sZSI6IlVzZXIiLCJleHAiOjE3MjM3MDE1ODZ9.OUeRxAO1NwPdfCDSA9AM0mqUVMMWyfvrupuTYlT9cHU",
          },
        }
      );
      if (response.data.success) {
        const data = response.data.friendList.map((item) => ({
          name: item.friend.name,
          drinksThisWeek: item.friend.numberOfDrinks,
          drinksTogether: item.numberOfDrinkingTogether,
          checked: false,
        }));
        setFriends(data);
        setMostTogether(response.data.mostDrinkTogetherFriend);
        setMostThisWeek(response.data.mostDrinkPerWeekFriend);
      }
    } catch (error) {
      console.error("Error fetching friends data:", error);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

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

  const handleAddFriendClick = () => {
    setShowAddFriendModal(true);
  };

  const handleCloseAddFriendModal = () => {
    setShowAddFriendModal(false);
  };

  const handleFriendAdded = () => {
    fetchFriends(); // 친구 목록을 다시 가져오기
    setShowAddFriendModal(false); // 모달 닫기
  };

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
              onClick={handleAddFriendClick} // 클릭 시 모달 열기
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
                <p className="friend-info-name">😀{mostTogether.friend.name}</p>
                <p className="friend-info-detail">
                  같이한 술자리 {mostTogether.numberOfDrinkingTogether}회
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
                <p className="friend-info-name">😵‍💫{mostThisWeek.friend.name}</p>
                <p className="friend-info-detail">
                  최근 7일간 {mostThisWeek.friend.numberOfDrinks}회 음주
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <BottomNav />
      {showAddFriendModal && (
        <AddFriendModal
          onClose={handleCloseAddFriendModal}
          onFriendAdded={handleFriendAdded}
        />
      )}
    </div>
  );
}

export default Friend;
