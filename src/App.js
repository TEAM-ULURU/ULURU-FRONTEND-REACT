import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "./pages/LoginScreen";
import EnteringPage1 from "./pages/EnteringPage1";
import EnteringPage2 from "./pages/EnteringPage2";
import EnteringPage3 from "./pages/EnteringPage3";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Friends from "./pages/Friends";
import MyPage from "./pages/MyPage";
import OAuthCallback from "./pages/OAuthCallback";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/entering-page-1" element={<EnteringPage1 />} />
          <Route path="/entering-page-2" element={<EnteringPage2 />} />
          <Route path="/entering-page-3" element={<EnteringPage3 />} />
          <Route path="/oauth-callback" element={<OAuthCallback />} />
          <Route path="/home" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
