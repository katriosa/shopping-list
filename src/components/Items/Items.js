import AddItem from "./AddItem";
import Filter from "./Fillter";
import ShowItems from "./ShowItems";
import ErrorModal from "../UI/ErrorModal";
import useHttp from "../../hooks/http";

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

const Items = () => {
  const [items, dispatch] = useReducer(itemReducer, []);

  const {
    isLoading,
    error,
    data,
    sendRequest,
    reqExtra,
    reqIdentifier,
    clear,
  } = useHttp();

  useEffect(() => {
    if (!isLoading && !error && reqIdentifier === "REMOVE_ITEM") {
      dispatch({ type: "DELETE", id: reqExtra });
    } else if (!isLoading && !error && reqIdentifier === "ADD_ITEM") {
      dispatch({
        type: "ADD",
        item: { id: data.name, ...reqExtra },
      });
    }
  }, [data, reqExtra, reqIdentifier, isLoading, error]);

  const filteredItemsHandler = useCallback((filteredItems) => {
    dispatch({ type: "SET", items: filteredItems });
  }, []);

  const saveDataHandler = useCallback(
    (enteredItem) => {
      sendRequest(
        "https://hooks-2a60a-default-rtdb.firebaseio.com/items.json",
        "POST",
        JSON.stringify(enteredItem),
        enteredItem,
        "ADD_ITEM"
      );
    },
    [sendRequest]
  );

  const removeItemHandler = useCallback(
    (itemId) => {
      sendRequest(
        `https://hooks-2a60a-default-rtdb.firebaseio.com/items/${itemId}.json`,
        "DELETE",
        null,
        itemId,
        "REMOVE_ITEM"
      );
    },
    [sendRequest]
  );

  const itemList = useMemo(() => {
    return <ShowItems items={items} onRemoveItem={removeItemHandler} />;
  }, [items, removeItemHandler]);

  return (
    <>
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <AddItem onSaveData={saveDataHandler} loading={isLoading} />

      <section>
        <Filter onFilterItems={filteredItemsHandler} />
        {itemList}
      </section>
    </>
  );
};

export default Items;
