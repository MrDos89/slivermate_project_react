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
      </Routes>
    </Router>
  );
}

export default App;
