import React, { useEffect, useRef, useState } from "react";
import CellRenderer from "./CellRenderer";
import { DATA } from "../constants/data";
import useUpdateEffect from "../hooks/useUpdateEffect";

const List = () => {
  const ref = useRef();
  const [keys, setKeys] = useState(new Set());

  const [state, setState] = useState(
    Array(20)
      .fill(0)
      .map((item, index) => {
        keys.add(index);
        return index;
      })
  );

  var observer;
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry, index, entries) => {
        // if (!entry.isIntersecting) {
        //   observer.unobserve(entry.target);
        //   entry.target.remove();
        // }
        if (entry.isIntersecting) {
          const currentId = +entry.target.id;
          const nextId = currentId + 1;
          const prevId = currentId - 1;

          if (!keys.has(nextId) && nextId < DATA.length) {
            keys.add(nextId);
            setState([...state, nextId]);
          }
          if (!keys.has(prevId) && prevId >= 0) {
            keys.add(prevId);
            setState([...state, prevId]);
          }
        }
      });
    };
    observer = new IntersectionObserver(observerCallback, {
      root: document.getElementById("listContainer"),
      rootMargin: "300px",
      threshold: 1.0,
    });
    state.forEach((item, index) => {
      observer.observe(document.getElementById(`${index}`));
    });

    return () => {
      observer.disconnect();
    };
  }, [state]);

  useEffect(() => {
    console.log("state useupdate", state);
    state.forEach((item) => {
      observer?.observe(document.getElementById(item));
    });
  }, [state]);

  return (
    <div
      ref={ref}
      id="listContainer"
      style={{
        height: 500,
        width: 200,
        border: "1px solid black",
        overflowY: "scroll",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div style={{ width: 200, height: DATA.length * 50 }}>
        {state.map((item) => (
          <CellRenderer index={item} id={`${item}`} key={item} />
        ))}
        {console.log(state)}
      </div>
    </div>
  );
};

export default List;
