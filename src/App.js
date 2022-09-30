import "./styles.css";
import TreeView from "./tree-view/TreeView";
import { dataSource } from "./data";
import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState();
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setData([...dataSource]);
  }, []);

  return (
    <div className="App">
      <h1>Tree View</h1>
      <TreeView
        dataSource={data}
        onSelect={(item) => setSelectedItem(item)}
        selected={selectedItem?.id}
      />
      <hr />
      Selected Item: {selectedItem?.name}
    </div>
  );
}
