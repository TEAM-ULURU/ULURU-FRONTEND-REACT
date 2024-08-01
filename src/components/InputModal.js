// src/components/InputModal.js

import React from "react";
import "./InputModal.css";
import closeIcon from "../img/Icon/closeIcon.png"; // 나가기 이미지 가져오기

const InputModal = ({ onClose }) => {
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
        <div className="modal-body">
          <input type="text" className="modal-input" />
          <button className="modal-button">술자리 참가</button>
        </div>
      </div>
    </div>
  );
};

export default InputModal;
