import React, { useState, useEffect } from "react";
import "./InviteModal.css";
import closeIcon from "../img/Icon/closeIcon.png"; // 닫기 아이콘 이미지 가져오기

const InviteModal = ({ onClose, roomCode }) => {
  const [inviteCode, setInviteCode] = useState("");

  useEffect(() => {
    setInviteCode(roomCode);
  }, [roomCode]);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(inviteCode).then(() => {
      alert("초대 코드가 복사되었습니다.");
    });
  };

  return (
    <div className="inviteModal-overlay" onClick={onClose}>
      <div className="invite-modal">
        <div
          className="invite-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="invite-modal-header">
            <span>초대 코드</span>
            <img
              src={closeIcon}
              alt="Close"
              className="close-icon"
              onClick={onClose}
            />
          </div>
          <div className="invite-modal-body">
            <input
              type="text"
              className="invite-code-input"
              value={inviteCode}
              readOnly
            />
            <button className="copy-button" onClick={handleCopyClick}>
              코드 복사
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
