import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";

import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import PostListPage from "./pages/PostListPage";
import Header from "./components/Header";
import FullPageScroll from "./components/FullPageScroll";
import LecturePage from "./pages/LecturePage";
import LectureDetailPage from "./pages/LectureDetailPage";
import HostInfoPage from "./pages/HostInfoPage";
import HostApplyPage from "./pages/HostApplyPage";
import FreeBoardPage from "./pages/FreeBoardPage";
import SeniorColumnPage from "./pages/SeniorColumnPage";
import PostDetailPage from "./pages/PostDetailPage";

import SignUpPage from "./pages/SignUpPage";
import LoginGroupPage from "./pages/LoginGroupPage";
import MyPage from "./pages/MyPage";
import ClubPage from "./pages/ClubPage";
import ClubDetailPage from "./pages/ClubDetailPage";
import ClubPostDetailPage from "./pages/ClubPostDetailPage";
import CreateClubTestPage from "./pages/CreateClubTestPage";

function App() {
  const [scrollIndex, setScrollIndex] = useState(0); // 상태 분리

  return (
    <Router>
      <Header setScrollIndex={setScrollIndex} /> {/*  전달 */}
      <Routes>
        {/* <Route path="/" element={<MainPage />} /> */}
        <Route
          path="/"
          element={
            <FullPageScroll
              scrollIndex={scrollIndex}
              setScrollIndex={setScrollIndex}
            />
          }
        />
        <Route path="/list" element={<PostListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/lecture" element={<LecturePage />} />
        <Route path="/lecture/:id" element={<LectureDetailPage />} />
        <Route path="/host-info" element={<HostInfoPage />} />
        <Route path="/host-apply" element={<HostApplyPage />} />
        <Route path="/freeboard" element={<FreeBoardPage />} />
        <Route path="/senior-column" element={<SeniorColumnPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />

        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/grouplogin" element={<LoginGroupPage />} />

        <Route path="/mypage" element={<MyPage />} />
        <Route path="/club" element={<ClubPage />} />
        <Route path="/club/:id" element={<ClubDetailPage />} />
        <Route
          path="/club/:clubId/post/:postId"
          element={<ClubPostDetailPage />}
        />
        <Route path="/create-club" element={<CreateClubTestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
