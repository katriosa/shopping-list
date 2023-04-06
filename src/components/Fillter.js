import "./Filter.css";
import Card from "../UI/Card";

const Filter = () => {
  return (
    <section className="filter">
      <Card>
        <div className="filter-input">
          <label>Filter by Title</label>
          <input type="text" />
        </div>
      </Card>
    </section>
  );
};
export default Filter;
