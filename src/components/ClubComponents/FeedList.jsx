import React, { useState } from "react";
import styled from "styled-components";
import FeedItem from "./FeedItem";
import { useNavigate } from "react-router-dom";
import isPropValid from "@emotion/is-prop-valid"; // styled-components v6 이상부터는 필요

const ListWrapper = styled.div`
  margin-top: 0px;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0;
  gap: 12px;
`;

const PageButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})`
  background-color: ${(props) => (props.active ? "#91c29b" : "#fff")};
  color: ${(props) => (props.active ? "white" : "#333")};
  border: 1px solid #ccc;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 1.2rem;
  cursor: pointer;
`;

const FeedList = ({ posts, clubId }) => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = posts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  if (posts.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "60px", color: "#aaa" }}>
        게시글이 없습니다.
      </div>
    );
  }

  return (
    <ListWrapper>
      {currentPosts.map((post) => (
        <div
          key={post.id}
          onClick={() => navigate(`/club/${clubId}/post/${post.id}`)} // ✅ 문자열 안에 따옴표 필요
        >
          <FeedItem post={post} clubId={clubId} />
        </div>
      ))}

      {/* <PaginationWrapper>
        {Array.from({ length: totalPages }, (_, i) => (
          <PageButton
            key={i}
            active={currentPage === i + 1}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </PageButton>
        ))}
      </PaginationWrapper> */}
      <PaginationWrapper>
        {Array.from({ length: totalPages }, (_, i) => (
          <PageButton
            key={i}
            active={currentPage === i + 1}
            onClick={() => {
              setCurrentPage(i + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            {i + 1}
          </PageButton>
        ))}
      </PaginationWrapper>
    </ListWrapper>
  );
};

export default FeedList;
