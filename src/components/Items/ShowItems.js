import "./ShowItems.css";

const ShowItems = (props) => {
  return (
    <section className="item-list">
      <h2>Loaded Items</h2>
      <ul>
        {props.items.map((i) => (
          <li key={i.id} onClick={props.onRemoveItem.bind(this, i.id)}>
            <span>{i.name}</span>
            <span>{i.amount}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default ShowItems;
