import React, { useState, useEffect } from "react";
import "./InviteModal.css";
import closeIcon from "../img/Icon/closeIcon.png"; // 닫기 아이콘 이미지 가져오기

const InviteModal = ({ onClose }) => {
  const [inviteCode, setInviteCode] = useState("");

  useEffect(() => {
    // 백엔드에서 초대 코드를 불러오는 코드
    // fetch("/api/inviteCode")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setInviteCode(data.code);
    //   });
    setInviteCode("Rekmdf23cm9qizp08");
  }, []);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(inviteCode).then(() => {
      alert("초대 코드가 복사되었습니다.");
    });
  };

  //   const modalStyle = {
  //     top: position ? position.top + window.scrollY : "36%",
  //     left: position ? position.left : "50%",
  //     transform: position ? "translateY(-50%)" : "translate(-50%, -50%)",
  //   };

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
              value={inviteCode}
              readOnly
              className="invite-code-input"
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
