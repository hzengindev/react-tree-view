import React from "react";
import styled from "styled-components";
import TreeItem from "./TreeItem";

const TreeList = ({
  data,
  onSelect,
  onCollapse,
  selected,
  isCollapse = true,
  style
}) => {
  if (!data || data.lenght === 0) return null;

  return (
    <StyledTreeList style={style} isCollapse={isCollapse}>
      {data.map((item) => (
        <TreeItem
          key={item.id}
          item={item}
          onSelect={onSelect}
          onCollapse={onCollapse}
          selected={selected}
        />
      ))}
    </StyledTreeList>
  );
};

export default TreeList;

const StyledTreeList = styled.div`
  @-webkit-keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  margin-left: 24px;
  -webkit-animation: fadeIn 1s;
  animation: fadeIn 1s;

  ${({ isCollapse }) =>
    !isCollapse &&
    `
    display: none;    
  `};
`;
