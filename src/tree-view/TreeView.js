import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TreeList from "./TreeList";

// data : [
//   {
//     id: uniqueKey,
//     name: "item-name",
//     icon:"icon-classname",
//     isSelectable: true,
//     children: [...]
//     isCollapse: false,
//   }
// ]

// onSelect : (selectedItem) => {console.log(selectedItem)}

// selected: data item "id"

const TreeView = ({ dataSource, onSelect, selected }) => {
  const [data, setData] = useState(null);

  const prepareData = (_dataSource) => {
    if (!_dataSource || _dataSource.length === 0) return [];

    const modifiedData = _dataSource.map((z) => {
      let d = {
        ...z,
        children: prepareData(z.children)
      };
      console.log(selected);
      d.isCollapse = selected
        ? d.children &&
          d.children.some((b) => b.id === selected || b.isCollapse)
        : false;

      return d;
    });

    return modifiedData;
  };

  const handleSelect = (item) => {
    onSelect(item);
  };

  const setCollapse = (_dataSource, id) => {
    if (!_dataSource || _dataSource.length === 0) return [];

    const modifiedData = _dataSource.map((z) => {
      return {
        ...z,
        isCollapse: z.id === id ? !z.isCollapse : z.isCollapse,
        children: setCollapse(z.children, id)
      };
    });

    return modifiedData;
  };

  const handleCollapse = (item) => {
    const modifiedData = setCollapse(data, item.id);
    setData(modifiedData);
  };

  useEffect(() => {
    const modifiedData = prepareData(dataSource);
    setData(modifiedData);
  }, [dataSource]);

  if (!data || data.length === 0) return null;

  return (
    <StyledTreeView>
      <TreeList
        data={data}
        onSelect={handleSelect}
        onCollapse={handleCollapse}
        style={{ marginLeft: 0 }}
        selected={selected}
      />
    </StyledTreeView>
  );
};

export default TreeView;

const StyledTreeView = styled.div``;
