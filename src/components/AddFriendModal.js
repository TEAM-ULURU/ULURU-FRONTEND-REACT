import React, { useState } from "react";
import axios from "axios";
import "./AddFriendModal.css";
import closeIcon from "../img/Icon/closeIcon.png"; // 닫기 이미지 가져오기

const AddFriendModal = ({ onClose, onFriendAdded }) => {
  const [friendCode, setFriendCode] = useState("");
  const [message, setMessage] = useState("");

  const handleFriendCodeChange = (e) => {
    setFriendCode(e.target.value);
  };
  const token = localStorage.getItem("accessToken");
  const handleAddFriend = async () => {
    try {
      const response = await axios.post(
        "https://alt-backend.com/api/friend/add?friendEmail="+encodeURI(friendCode),
        {},
        {
          headers: {
            Authorization:
              token,
          },
        }
      );
      if (response.data.success) {
        onFriendAdded(); // 친구 추가 성공 시 호출하여 친구 목록 새로고침
      } else {
        setMessage(response.data.msg);
      }
    } catch (error) {
      setMessage("해당 친구를 추가할 수 없습니다.");
      console.error("Error adding friend:", error);
    }
  };

  return (
    <div className="addFriendModal-overlay" onClick={onClose}>
      <div className="afmodal-content" onClick={(e) => e.stopPropagation()}>
        <div className="afmodal-header">
          <span>친구 추가</span>
          <img
            src={closeIcon}
            alt="Close"
            className="exit-icon"
            onClick={onClose}
          />
        </div>
        <div className="afmodal-body">
          <div className="inputfdcode">
            <input
              type="text"
              value={friendCode}
              onChange={handleFriendCodeChange}
              placeholder="친구 이메일 입력"
              className="friend-code-input"
            />
            <button onClick={handleAddFriend} className="add-friend-button">
              친구 추가
            </button>
          </div>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default AddFriendModal;
