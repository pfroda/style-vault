'use-client'
import './item.css';

function Item({ url, brand }) {
  return (
    <div className="item">
      <img className="image" src={url} alt="" />
      <div className="brand">{brand}</div>
    </div>
  )
}

export default Item