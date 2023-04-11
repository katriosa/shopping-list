import "./Filter.css";
import Card from "../UI/Card";
import React, { useState, useEffect } from "react";

const Filter = React.memo((props) => {
  const [enteredFilter, setEnteredFilter] = useState("");
  const { onFilterItems } = props;

  useEffect(() => {
    const query =
      enteredFilter.length === 0
        ? ""
        : `?orderBy="name"&equalTo="${enteredFilter}"`;
    fetch("https://hooks-2a60a-default-rtdb.firebaseio.com/items.json" + query)
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
  }, [enteredFilter, onFilterItems]);

  return (
    <section className="filter">
      <Card>
        <div className="filter-input">
          <label>Filter by Title</label>
          <input
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
