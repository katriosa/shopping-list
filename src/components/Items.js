import AddItem from "./AddItem";
import Filter from "./Fillter";
import ShowItems from "./ShowItems";

import { useState, useEffect, useCallback } from "react";

const Items = () => {
  const [items, setItems] = useState([]);

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

  const removeItemHandler = (itemId) => {
    fetch(
      `https://hooks-2a60a-default-rtdb.firebaseio.com/items/${itemId}.json`,
      {
        method: "DELETE",
      }
    ).then((response) => {
      setItems((prev) => prev.filter((item) => item.id !== itemId));
    });
  };

  return (
    <>
      <AddItem onSaveData={saveDataHandler} />

      <section>
        <Filter onFilterItems={filteredItemsHandler} />
        <ShowItems items={items} onRemoveItem={removeItemHandler} />
      </section>
    </>
  );
};

export default Items;
