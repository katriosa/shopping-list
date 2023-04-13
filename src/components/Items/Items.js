import AddItem from "./AddItem";
import Filter from "./Fillter";
import ShowItems from "./ShowItems";
import ErrorModal from "../UI/ErrorModal";

import { useReducer, useEffect, useCallback } from "react";

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
  // const [items, setItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Rendering", items);
  }, [items]);

  const filteredItemsHandler = useCallback((filteredItems) => {
    // setItems(filteredItems);
    dispatch({ type: "SET", items: filteredItems });
  }, []);

  const saveDataHandler = (enteredItem) => {
    dispatchHttp({ type: "SEND" });
    // setIsLoading(true);
    fetch("https://hooks-2a60a-default-rtdb.firebaseio.com/items.json", {
      method: "POST",
      body: JSON.stringify(enteredItem),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        dispatchHttp({ type: "RESPONSE" });
        // setIsLoading(false);
        return response.json();
      })
      .then((responseData) => {
        // setItems((prev) => [
        //   ...prev,
        //   { id: responseData.name, ...enteredItem },
        // ]);
        dispatch({
          type: "ADD",
          item: { id: responseData.name, ...enteredItem },
        });
      });
  };

  const removeItemHandler = (itemId) => {
    dispatchHttp({ type: "SEND" });
    // setIsLoading(true);
    fetch(
      `https://hooks-2a60a-default-rtdb.firebaseio.com/items/${itemId}.jon`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        dispatchHttp({ type: "RESPONSE" });
        // setIsLoading(false);
        // setItems((prev) => prev.filter((item) => item.id !== itemId));
        dispatch({ type: "DELETE", id: itemId });
      })
      .catch((error) => {
        // setError("Something went wrong!");
        dispatchHttp({ type: "ERROR", errorMessage: "Something went wrong!" });
      });
  };

  const clearError = () => {
    // setError(null);
    // setIsLoading(false);
    dispatchHttp({ type: "CLEAR" });
  };

  return (
    <>
      {httpState.error && (
        <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
      )}
      <AddItem onSaveData={saveDataHandler} loading={httpState.loading} />

      <section>
        <Filter onFilterItems={filteredItemsHandler} />
        <ShowItems items={items} onRemoveItem={removeItemHandler} />
      </section>
    </>
  );
};

export default Items;
