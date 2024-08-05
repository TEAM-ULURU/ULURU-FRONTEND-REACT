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
    try {
      const response = await axios.post(
        `http://ec2-18-116-81-21.us-east-2.compute.amazonaws.com:8080/api/room/enter?roomCode=${inviteCode}`,
        {},
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicm9sZSI6IlVzZXIiLCJleHAiOjE3MjM3MDE1ODZ9.OUeRxAO1NwPdfCDSA9AM0mqUVMMWyfvrupuTYlT9cHU",
          },
        }
      );
      if (response.data.success) {
        onJoinSuccess(response.data.object); // 성공 응답 받으면 방 정보 전달
        onClose();
      } else {
        setError("코드가 올바르지 않습니다.");
      }
    } catch (error) {
      setError("서버와 통신 중 오류가 발생했습니다.");
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
