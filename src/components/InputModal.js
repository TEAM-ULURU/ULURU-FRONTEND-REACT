import React, { useState } from "react";
import axios from "axios";
import "./InputModal.css";
import closeIcon from "../img/Icon/closeIcon.png"; // 나가기 이미지 가져오기

const InputModal = ({ onClose, onJoinSuccess }) => {
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setInviteCode(e.target.value);
  };

  const handleJoinClick = async () => {
    
		console.log("fdfdsf");

		const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        "https://alt-backend.com/api/room/enter?roomCode=" + encodeURI(inviteCode),
        {},
        {
          headers: {
            Authorization:
              token,
          },
        }
      );
      if (response.data.success) {
        onJoinSuccess(response.data.object); // 성공 응답 받으면 방 정보 전달
        onClose();
      } else {
        setError("코드가 올바르지 않습니다.");
      }
    
  };

  return (
    <div className="inputModal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span>코드 입력하기</span>
          <img
            src={closeIcon}
            alt="Close"
            className="exit-icon"
            onClick={onClose}
          />
        </div>
        {error && <p className="invitein-error-message">{error}</p>}
        <div className="modal-body">
          <input
            type="text"
            className="modal-input"
            value={inviteCode}
            onChange={handleInputChange}
          />
          <button className="modal-button" onClick={handleJoinClick}>
            술자리 참가
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputModal;
