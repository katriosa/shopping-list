import AddItem from "./AddItem";
import Filter from "./Fillter";
import ShowItems from "./ShowItems";

import { useState, useEffect, useCallback } from "react";

const Items = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://hooks-2a60a-default-rtdb.firebaseio.com/items.json")
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
        setItems(loadedItems);
      });
  }, []);

  useEffect(() => {
    console.log("Rendering", items);
  }, [items]);

  const filteredItemsHandler = useCallback((filteredItems) => {
    setItems(filteredItems);
  }, []);

  const saveDataHandler = (enteredItem) => {
    fetch("https://hooks-2a60a-default-rtdb.firebaseio.com/items.json", {
      method: "POST",
      body: JSON.stringify(enteredItem),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setItems((prev) => [
          ...prev,
          { id: responseData.name, ...enteredItem },
        ]);
      });
  };
  return (
    <>
      <AddItem onSaveData={saveDataHandler} />

      <section>
        <Filter onFilterItems={filteredItemsHandler} />
        <ShowItems items={items} />
      </section>
    </>
  );
};

export default Items;
