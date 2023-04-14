import "./Filter.css";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import React, { useState, useEffect, useRef } from "react";
import useHttp from "../../hooks/http";

const Filter = React.memo((props) => {
  const [enteredFilter, setEnteredFilter] = useState("");
  const { onFilterItems } = props;
  const inputRef = useRef();
  const { isLoading, data, error, sendRequest, clear } = useHttp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query =
          enteredFilter.length === 0
            ? ""
            : `?orderBy="name"&equalTo="${enteredFilter}"`;
        sendRequest(
          "https://hooks-2a60a-default-rtdb.firebaseio.com/items.json" + query,
          "GET"
        );
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, inputRef, sendRequest]);

  useEffect(() => {
    if (!isLoading && !error && data) {
      const loadedItems = [];
      for (const key in data) {
        loadedItems.push({
          id: key,
          name: data[key].name,
          amount: data[key].amount,
        });
      }
      onFilterItems(loadedItems);
    }
  }, [data, isLoading, error, onFilterItems]);

  return (
    <section className="filter">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="filter-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
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
