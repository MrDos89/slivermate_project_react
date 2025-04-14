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
import CreateClubPage from "./pages/CreateClubPage";
import ChatTestPage from "./pages/ChatTestPage";

import { AuthProvider } from "./components/Context/AuthContext";
import OnlyGuestRoute from "./components/Routes/OnlyGuestRoute";
import PrivateRoute from "./components/Routes/PrivateRoute";

function App() {
  const [scrollIndex, setScrollIndex] = useState(0); // 상태 분리

  return (
    <Router>
      <AuthProvider>
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
          <Route
            path="/login"
            element={
              <OnlyGuestRoute>
                <LoginPage />
              </OnlyGuestRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <OnlyGuestRoute>
                <SignUpPage />
              </OnlyGuestRoute>
            }
          />
          <Route
            path="/grouplogin"
            element={
              <OnlyGuestRoute>
                <LoginGroupPage />
              </OnlyGuestRoute>
            }
          />

          <Route path="/lecture" element={<LecturePage />} />
          <Route path="/lecture/:id" element={<LectureDetailPage />} />
          <Route path="/host-info" element={<HostInfoPage />} />
          <Route
            path="/host-apply"
            element={
              <PrivateRoute>
                <HostApplyPage />
              </PrivateRoute>
            }
          />
          <Route path="/freeboard" element={<FreeBoardPage />} />
          <Route path="/senior-column" element={<SeniorColumnPage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />

          <Route
            path="/mypage"
            element={
              <PrivateRoute>
                <MyPage />
              </PrivateRoute>
            }
          />
          <Route path="/club" element={<ClubPage />} />
          <Route path="/club/:id" element={<ClubDetailPage />} />
          <Route
            path="/club/:clubId/post/:postId"
            element={<ClubPostDetailPage />}
          />
          <Route
            path="/create-club"
            element={
              <PrivateRoute>
                <CreateClubPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <ChatTestPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
