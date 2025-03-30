import React from "react";
import styled from "styled-components";

const DropdownWrapper = styled.div`
  position: relative;
  z-index: 51;
`;

const DropdownButton = styled.button`
  padding: 20px 30px;
  width: 300px;;
  height: 70px;
  font-size: 1.6rem;
  cursor: pointer;
  background-color: #ffffff;
  border: 2px solid #ccc;
  border-radius: 12px;
  min-width: 250px;
  text-align: left;
  transition: 0.3s;
  &:hover {
    background-color: #e5f7ec;
    border-color: #91c29b;
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  background: #ffffff;
  border: 2px solid #b4cfb5;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0,0,0,0.1);
  z-index: 10;
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #cae6d3;
    border-radius: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f9f9f9;
  }
`;

const DropdownItem = styled.li`
  padding: 15px 20px;
  cursor: pointer;
  font-size: 1.5rem;
  border-bottom: 1px solid #eee;

  &:hover {
    background-color: #f0f8f0;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Dropdown = ({ selected, setSelected, show, setShow, options }) => {
  return (
    <DropdownWrapper>
      <DropdownButton onClick={() => setShow(!show)}>
        {selected.name}
      </DropdownButton>
      {show && (
        <DropdownList>
          {options.map((item) => (
            <DropdownItem
              key={item.id}
              onClick={() => {
                setSelected(item);
                setShow(false);
              }}
            >
              {item.name}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownWrapper>
  );
};

export default Dropdown;
