import InfiniteScroll from "react-infinite-scroll-component";
import React, { useState } from "react";

const InfiniteScrollExample = () => {
  const [items, setItems] = useState(Array.from({ length: 20 }));

  const fetchMoreData = () => {
    setTimeout(() => {
      setItems((prev) => [...prev, ...Array.from({ length: 20 })]);
    }, 1500);
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      {items.map((_, index) => (
        <div key={index} style={{ padding: 20, border: "1px solid black", margin: "10px 0" }}>
          Item #{index}
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default InfiniteScrollExample;
