import React from "react";
import styled from "styled-components";
import TreeList from "./TreeList";

const TreeItem = ({ item, onSelect, onCollapse, selected }) => {
  if (!item) return null;

  const handleSelect = (e, item) => {
    e.stopPropagation();
    if (!item.isSelectable) return;
    onSelect(item);
  };

  const handleCollapse = (e, item) => {
    e.stopPropagation();
    onCollapse(item);
  };

  const collapseButton = (item) => {
    return (
      <StyledCollapseButton onClick={(e) => handleCollapse(e, item)}>
        {item.isCollapse ? <StyledArrowDown /> : <StyledArrowRight />}
      </StyledCollapseButton>
    );
  };

  return (
    <StyledTreeItem onClick={(e) => handleSelect(e, item)}>
      <StyledRow>
        {collapseButton(item)}
        <StyledRowText
          isSelectable={item.isSelectable}
          isSelected={item.id === selected}
        >
          {item.name}
        </StyledRowText>
      </StyledRow>
      <TreeList
        data={item.children}
        onSelect={onSelect}
        isCollapse={item.isCollapse}
        onCollapse={onCollapse}
        selected={selected}
      />
    </StyledTreeItem>
  );
};

export default TreeItem;

const StyledTreeItem = styled.div`
  margin: 4px;
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: start;
  align-content: center;
`;

const StyledCollapseButton = styled.button`
  background: none;
  border: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
`;

const StyledRowText = styled.span`
  margin-left: 2px;
  padding: 5px 10px;
  border-radius: 0.2em !important;
  background: ${(props) => (props.isSelected ? "#ddd" : "")};

  ${({ isSelectable }) => isSelectable && `cursor: pointer`};
`;

const StyledArrowRight = styled.i`
  & {
    box-sizing: border-box;
    position: relative;
    display: block;
    width: 22px;
    height: 22px;
    border: 2px solid;
    transform: scale(var(--ggs, 1));
    border-radius: 4px;
  }
  &::after,
  &::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    right: 4px;
  }
  &::after {
    width: 6px;
    height: 6px;
    border-top: 2px solid;
    border-right: 2px solid;
    transform: rotate(45deg);
    bottom: 6px;
  }
  &::before {
    width: 10px;
    height: 2px;
    bottom: 8px;
    background: currentColor;
  }
`;

const StyledArrowDown = styled.i`
  & {
    box-sizing: border-box;
    position: relative;
    display: block;
    width: 22px;
    height: 22px;
    border: 2px solid;
    transform: scale(var(--ggs, 1));
    border-radius: 4px;
  }
  &::after,
  &::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    bottom: 4px;
  }
  &::after {
    width: 6px;
    height: 6px;
    border-bottom: 2px solid;
    border-left: 2px solid;
    transform: rotate(-45deg);
    left: 6px;
  }
  &::before {
    width: 2px;
    height: 10px;
    left: 8px;
    background: currentColor;
  }
`;
