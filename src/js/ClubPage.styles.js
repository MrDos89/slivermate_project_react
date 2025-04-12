// 📄 ClubPage.styles.js
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 60px;
  padding: 40px;

  /* ✅ 양쪽 그림자 추가 */
  box-shadow: -8px 0 15px rgba(30, 177, 0, 0.05), 8px 0 15px rgba(30, 177, 0, 0.05);
`;

export const FixedTop = styled.div`
  flex-shrink: 0;
  background-color: white;
  z-index: 10;
  border-bottom: 1px solid #eee;
`;

export const Inner = styled.div`
  width: 100vw;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const SearchBarWrapper = styled.form`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
`;

export const SearchBar = styled.input`
  width: 100%;
  padding: 12px 50px 12px 20px;
  font-size: 1rem;
  border: 2px solid #a5d6a7;
  border-radius: 30px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #66bb6a;
  }

  &::placeholder {
    color: #a5a5a5;
    font-style: italic;
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #66bb6a;
  font-size: 1.2rem;

  &:hover {
    color: #43a047;
  }
`;

export const CategoryWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 110px;
`;

export const SubCategoryRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  gap: 10px;
  align-items: center;
`;

export const CategoryTitle = styled.div`
  font-weight: bold;
  margin-top: 20px;
  margin-right: 30px;
`;

export const CategoryButton = styled.button`
  padding: 8px 16px;
  border: none;
  background: transparent;
  color: #4caf50;
  font-weight: ${({ $active, $isTotal }) =>
    $isTotal ? "bold" : $active ? "bold" : "normal"};
  border-radius: 5px;
  cursor: pointer;
  transition: font-weight 0.2s ease;

  &:hover {
    font-weight: bold;
  }
`;

export const ClubListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
  min-height: 400px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ClubCard = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #ddd;
  padding-top: 20px;
  width: 100%;
  max-width: 1000px;
  cursor: pointer;
`;

export const ClubInfo = styled.div`
  flex: 1;
`;

export const ClubTitle = styled.h3`
  margin-bottom: 5px;
  font-size: 1.2rem;
  font-weight: bold;
`;

export const ClubMeta = styled.div`
  color: #666;
  margin-bottom: 10px;
  font-size: 0.9rem;
`;

export const ClubDesc = styled.p`
  font-size: 0.95rem;
  color: #333;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Thumbnail = styled.img`
  width: 120px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
  margin-left: 20px;
`;

export const DropdownWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
`;

export const RegionLabel = styled.div`
  font-weight: bold;
`;

export const RegionDropdown = styled.select`
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D'10'%20height%3D'6'%20viewBox%3D'0%200%2010%206'%20fill%3D'none'%20xmlns%3D'http%3A//www.w3.org/2000/svg'%3E%3Cpath%20d%3D'M1%201L5%205L9%201'%20stroke%3D'%2366bb6a'%20stroke-width%3D'2'%20stroke-linecap%3D'round'%20stroke-linejoin%3D'round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 10px;

  &:focus {
    border-color: #66bb6a;
    outline: none;
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0;
  gap: 10px;
`;

export const PageButton = styled.button`
  padding: 8px 12px;
  border-radius: 5px;
  background-color: ${({ active }) => (active ? "#66bb6a" : "#f0f0f0")};
  color: ${({ active }) => (active ? "white" : "#333")};
  border: none;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #81c784;
    color: white;
  }
`;
