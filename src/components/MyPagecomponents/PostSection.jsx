import styled from "styled-components";

const PostSectionWrapper = styled.div`
  margin-top: 190px;
`;

const PostTitle = styled.h2`
  text-align: left;
  margin-bottom: 20px;
`;

const PostDropdown = styled.select`
  padding: 5px 10px;
  font-size: 16px;
  margin-bottom: 20px;
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const TableHeader = styled.th`
  background-color: rgb(115, 170, 127);
  color: white;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
`;

const TableRow = styled.tr`
  background-color: #ffffff;
  &:nth-child(even) {
    background-color: #f4f4f4;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  background-color: rgb(100, 196, 120);
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  margin: 0 5px;

  &:hover {
    background-color: rgb(100, 196, 120);
  }
`;

function PostSection({
  user,
  visiblePosts,
  selectedPostType,
  postVisibleCount,
  startPostIndex,
  setStartPostIndex,
  handlePostTypeChange,
  hobbyMap,
  sectionTitle,
}) {
  console.log("넘겨받은 userPosts 확인 👉", userPosts);
  console.log("넘겨받은 userComments 확인 👉", userComments);

  // 필터링 후 슬라이스
  const selectedList =
    selectedPostType === 1 ? userPosts || [] : userComments || [];
  const totalCount = selectedList.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / postVisibleCount));
  const slicedList = selectedList.slice(
    startPostIndex,
    startPostIndex + postVisibleCount
  );

  const handlePostPrev = () => {
    setStartPostIndex((prev) => Math.max(prev - postVisibleCount, 0));
  };

  const handlePostNext = () => {
    if (startPostIndex + postVisibleCount < selectedList.length) {
      setStartPostIndex((prev) => prev + postVisibleCount);
    }
  };

  return (
    <PostSectionWrapper>
      <PostTitle>{sectionTitle}</PostTitle>
      <PostDropdown onChange={handlePostTypeChange}>
        <option value={1}>게시글 보기</option>
        <option value={2}>댓글 보기</option>
      </PostDropdown>

      <TableWrapper>
        {selectedPostType === 1 ? (
          <Table>
            <thead>
              <tr>
                <TableHeader>번호</TableHeader>
                <TableHeader>내용</TableHeader>
                <TableHeader>작성일</TableHeader>
                <TableHeader>유저이름</TableHeader>
                <TableHeader>취미</TableHeader>
              </tr>
            </thead>
            <tbody>
              {slicedList.map((post, index) => (
                <TableRow key={post.postId}>
                  <TableCell>{startPostIndex + index + 1}</TableCell>
                  <TableCell>{post.postNote}</TableCell>
                  <TableCell>
                    {new Date(post.registerDate).toLocaleDateString("ko-KR")}
                  </TableCell>
                  <TableCell>{post.userNickname}</TableCell>
                  <TableCell>
                    {hobbyMap[post.postCategoryId === 1 ? "indoor" : "outdoor"]
                      ?.list?.[post.postSubCategoryId] || "-"}
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        ) : (
          <Table>
            <thead>
              <tr>
                <TableHeader>번호</TableHeader>
                <TableHeader>내용</TableHeader>
                <TableHeader>작성일</TableHeader>
                <TableHeader>유저이름</TableHeader>
              </tr>
            </thead>
            <tbody>
              {slicedList.map((post, index) => (
                <TableRow key={post.commentId}>
                  <TableCell>{startPostIndex + index + 1}</TableCell>
                  <TableCell>{post.commentText}</TableCell>
                  <TableCell>
                    {new Date(post.updDate).toLocaleDateString("ko-KR")}
                  </TableCell>
                  <TableCell>{post.userNickname}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        )}
      </TableWrapper>

      <PaginationWrapper>
        <PageButton onClick={handlePostPrev} disabled={startPostIndex === 0}>
          이전
        </PageButton>
        <span>
          {Math.floor(startPostIndex / postVisibleCount) + 1} /{" "}
          {Math.ceil(
            user.posts.filter((post) => post.type === selectedPostType).length /
              postVisibleCount
          )}
        </span>
        <PageButton
          onClick={handlePostNext}
          disabled={
            startPostIndex + postVisibleCount >=
            user.posts.filter((post) => post.type === selectedPostType).length
          }
        >
          다음
        </PageButton>
      </PaginationWrapper>
    </PostSectionWrapper>
  );
}

export default PostSection;
