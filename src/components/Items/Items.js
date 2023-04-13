import AddItem from "./AddItem";
import Filter from "./Fillter";
import ShowItems from "./ShowItems";
import ErrorModal from "../UI/ErrorModal";

import { useReducer, useEffect, useCallback, useMemo } from "react";

const itemReducer = (currentItems, action) => {
  switch (action.type) {
    case "SET":
      return action.items;
    case "ADD":
      return [...currentItems, action.item];
    case "DELETE":
      return currentItems.filter((item) => item.id !== action.id);
    default:
      throw new Error("Should not get there!");
  }
};

const httpReducer = (curhttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null };
    case "RESPONSE":
      return { ...curhttpState, loading: false };
    case "ERROR":
      return { loading: false, error: action.errorMessage };
    case "CLEAR":
      return { ...curhttpState, error: null };
    default:
      throw new Error("Should not be reached!");
  }
};

const Items = () => {
  const [items, dispatch] = useReducer(itemReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
  });

  useEffect(() => {
    console.log("Rendering", items);
  }, [items]);

  const filteredItemsHandler = useCallback((filteredItems) => {
    // setItems(filteredItems);
    dispatch({ type: "SET", items: filteredItems });
  }, []);

  const saveDataHandler = useCallback((enteredItem) => {
    dispatchHttp({ type: "SEND" });
    fetch("https://hooks-2a60a-default-rtdb.firebaseio.com/items.json", {
      method: "POST",
      body: JSON.stringify(enteredItem),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        dispatchHttp({ type: "RESPONSE" });
        return response.json();
      })
      .then((responseData) => {
        dispatch({
          type: "ADD",
          item: { id: responseData.name, ...enteredItem },
        });
      });
  }, []);

  const removeItemHandler = useCallback((itemId) => {
    dispatchHttp({ type: "SEND" });
    fetch(
      `https://hooks-2a60a-default-rtdb.firebaseio.com/items/${itemId}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        dispatchHttp({ type: "RESPONSE" });
        dispatch({ type: "DELETE", id: itemId });
      })
      .catch((error) => {
        dispatchHttp({ type: "ERROR", errorMessage: "Something went wrong!" });
      });
  }, []);

  const clearError = useCallback(() => {
    dispatchHttp({ type: "CLEAR" });
  }, []);

  const itemList = useMemo(() => {
    return <ShowItems items={items} onRemoveItem={removeItemHandler} />;
  }, [items, removeItemHandler]);

  return (
    <>
      {httpState.error && (
        <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
      )}
      <AddItem onSaveData={saveDataHandler} loading={httpState.loading} />

      <section>
        <Filter onFilterItems={filteredItemsHandler} />
        {itemList}
      </section>
    </>
  );
};

export default Items;
