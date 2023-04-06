import Card from "../UI/Card";
import "./AddItem.css";

const AddItem = () => {
  return (
    <section className="item-form">
      <Card>
        <form>
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input tupe="number" id="amount" />
          </div>
          <div>
            <button type="submit">Add Item</button>
          </div>
        </form>
      </Card>
    </section>
  );
};
export default AddItem;
