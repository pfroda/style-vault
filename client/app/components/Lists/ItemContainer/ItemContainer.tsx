import './itemcontainer.css';
import Item from '../Item/Item';

function ItemContainer({ items }) {
  return (
    <div className="items-list-container">
      {items.map((item, index) => (
        <Item key={index} url={item.url} brand={item.brand} />
      ))}
    </div>
  );
}

export default ItemContainer;