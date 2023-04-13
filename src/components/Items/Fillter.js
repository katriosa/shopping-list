import "./Filter.css";
import Card from "../UI/Card";
import React, { useState, useEffect, useRef } from "react";

const Filter = React.memo((props) => {
  const [enteredFilter, setEnteredFilter] = useState("");
  const { onFilterItems } = props;
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query =
          enteredFilter.length === 0
            ? ""
            : `?orderBy="name"&equalTo="${enteredFilter}"`;
        fetch(
          "https://hooks-2a60a-default-rtdb.firebaseio.com/items.json" + query
        )
          .then((response) => response.json())
          .then((responseData) => {
            const loadedItems = [];
            for (const key in responseData) {
              loadedItems.push({
                id: key,
                name: responseData[key].name,
                amount: responseData[key].amount,
              });
            }
            onFilterItems(loadedItems);
          });
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, onFilterItems, inputRef]);

  return (
    <section className="filter">
      <Card>
        <div className="filter-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});
export default Filter;
