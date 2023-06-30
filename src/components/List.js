import React, { useEffect, useRef } from "react";
import CellRenderer from "./CellRenderer";
import * as ReactDOM from "react-dom/client";
import { root } from "..";

const List = () => {
  const ref = useRef();
  const items = [];
  for (let i = 0; i < 1; i++) {
    items.push(i);
  }
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry, index, entries) => {
        // if (index == 0) {
        //   console.log(entry.target.id);
        //   return;
        // }
        // console.log(entry.isIntersecting);
        // if (!entry.isIntersecting) {
        //   observer.unobserve(entry.target);
        //   entry.target.remove();
        // }
        //const currentId = entry.target.id;
        if (!entry.isIntersecting) {
          observer.unobserve(entry.target);
          entry.target.remove();
        }
        if (entry.isIntersecting) {
          const currentId = +entry.target.id;
          const nextId = currentId + 1;
          document.createElement("afijh");
          //   const element = ReactDOM.render(
          //     <CellRenderer index={+currentId + 1} id={`${+currentId + 1}`} />,
          //     document.getElementById("root")
          //   );

          //   ref.current.appendChild(
          //     CellRenderer({ index: +currentId + 1, id: `${+currentId + 1}` })
          //   );
          console.log(currentId);
        }
        /**** 
        if (entry.isIntersecting) {
          const currentId = entry.target.id;

          ReactDOM.render(
            <CellRenderer index={+currentId + 1} id={`${+currentId + 1}`} />,
            document.getElementById("root")
          );
          const listContainer = findDOMNode
          ref.current.appendChild(document.getElementById(`${+currentId + 1}`));
            ****/
        // ReactDOM.render(
        //   <CellRenderer index={+currentId + 1} id={`${+currentId + 1}`} />,
        //   ref.current
        // );
        //document.getElementById("listContainer").appendChild();
        //   observer.observe(document.getElementById(`${+currentId + 1}`));
        //}
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: document.getElementById("listContainer"),
      rootMargin: "300px",
      threshold: 1.0,
    });
    items.forEach((item) => {
      observer.observe(document.getElementById(`${item}`));
    });

    return () => {
      observer.disconnect();
    };
  }, []);
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
      }}
    >
      {items.map((item) => {
        return <CellRenderer key={item} id={`${item}`} index={item} />;
      })}
    </div>
  );
};

export default List;
