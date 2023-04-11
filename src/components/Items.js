import AddItem from "./AddItem";
import Filter from "./Fillter";
import ShowItems from "./ShowItems";

import { useState } from "react";

const Items = () => {
  const [items, setItems] = useState([]);

  const saveDataHandler = (enteredItem) => {
    setItems((prev) => [
      ...prev,
      { id: Math.random().toString(), ...enteredItem },
    ]);
  };
  console.log(items);
  return (
    <>
      <AddItem onSaveData={saveDataHandler} />

      <section>
        <Filter />
        <ShowItems items={items} />
      </section>
    </>
  );
};

export default Items;
