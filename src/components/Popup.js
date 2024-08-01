import React from "react";
import "./Popup.css";

const Popup = ({ onClose }) => {
  const handleClickOutside = (event) => {
    if (event.target.className === "popup-overlay") {
      onClose();
    }
  };

  return (
    <div className="popup-overlay" onClick={handleClickOutside}>
      <div className="popup">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <table>
          <thead>
            <tr>
              <th>혈중알코올농도 (%)</th>
              <th>증상</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0.05 이하</td>
              <td>정상일 때와 똑같이 행동해요.</td>
            </tr>
            <tr>
              <td>0.05~0.15</td>
              <td>
                약간 취한 기분이며 얼굴이 붉어져요. <br></br>말이 많아지며
                침착성이 없어지고 반사작용이 떨어져요.
              </td>
            </tr>
            <tr>
              <td>0.15~0.25</td>
              <td>
                감각이 떨어지고 주의력이 산만해져요. <br></br>판단력이 떨어져
                교통사고를 내기 쉬워요.
              </td>
            </tr>
            <tr>
              <td>0.25~0.35</td>
              <td>
                운동신경이 마비되어 정상적으로 걸을 수 없고 말을 명확하게 하지
                못해요.
              </td>
            </tr>
            <tr>
              <td>0.35~0.45</td>
              <td>
                호흡이 곤란해지고 의식을 잃게 돼요. <br></br>체온이 떨어져
                혼수상태에 빠져요.
              </td>
            </tr>
            <tr>
              <td>0.45 이상</td>
              <td>매우 치명적이며 죽을 수도 있어요.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Popup;
