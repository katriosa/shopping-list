import Card from "../UI/Card";
import "./AddItem.css";
import React, { useState } from "react";
import LoadingIndicator from "../UI/LoadingIndicator";

const AddItem = React.memo((props) => {
  const [enteredName, setEnteresName] = useState("");
  const [enteredAmount, setEnteresAmount] = useState("");

  const nameInputHandler = (e) => {
    setEnteresName(e.target.value);
  };

  const amountInputHandler = (e) => {
    setEnteresAmount(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const enteredData = {
      name: enteredName,
      amount: enteredAmount,
    };
    props.onSaveData(enteredData);
  };

  return (
    <section className="item-form">
      <Card>
        <form onSubmit={formSubmitHandler}>
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={enteredName}
              onChange={nameInputHandler}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              tupe="number"
              id="amount"
              value={enteredAmount}
              onChange={amountInputHandler}
            />
          </div>
          <div className="item-form__actions">
            <button type="submit">Add Item</button>
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});
export default AddItem;
