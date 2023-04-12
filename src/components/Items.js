import AddItem from "./AddItem";
import Filter from "./Fillter";
import ShowItems from "./ShowItems";
import ErrorModal from "../UI/ErrorModal";

import { useState, useEffect, useCallback } from "react";

const Items = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Rendering", items);
  }, [items]);

  const filteredItemsHandler = useCallback((filteredItems) => {
    setItems(filteredItems);
  }, []);

  const saveDataHandler = (enteredItem) => {
    setIsLoading(true);
    fetch("https://hooks-2a60a-default-rtdb.firebaseio.com/items.json", {
      method: "POST",
      body: JSON.stringify(enteredItem),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setIsLoading(false);
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
    setIsLoading(true);
    fetch(
      `https://hooks-2a60a-default-rtdb.firebaseio.com/items/${itemId}.jon`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        setIsLoading(false);
        setItems((prev) => prev.filter((item) => item.id !== itemId));
      })
      .catch((error) => {
        setError("Something went wrong!");
      });
  };

  const clearError = () => {
    setError(null);
    setIsLoading(false);
  };

  return (
    <>
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <AddItem onSaveData={saveDataHandler} loading={isLoading} />

      <section>
        <Filter onFilterItems={filteredItemsHandler} />
        <ShowItems items={items} onRemoveItem={removeItemHandler} />
      </section>
    </>
  );
};

export default Items;
