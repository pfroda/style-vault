import './itemslist.css'

function ItemsList() {
  return (
    <div className='ItemsList'>
      <h2>Closet Name</h2>
      <div className="items-list-header">
        <div className="header-options">
          <button className='closet-button'>Closet</button>
          <button className='outfit-button'>Outfits</button>
        </div>
      </div>

      <div className="items-list-container">
        <div className="item">
          <div className="image"></div>
          <div className="brand">Brand</div>
        </div>
        <div className="item">
          <div className="image"></div>
          <div className="brand">Brand</div>
        </div>
        <div className="item">
          <div className="image"></div>
          <div className="brand">Brand</div>
        </div>
        <div className="item">
          <div className="image"></div>
          <div className="brand">Brand</div>
        </div>
        <div className="item">
          <div className="image"></div>
          <div className="brand">Brand</div>
        </div>
        <div className="item">
          <div className="image"></div>
          <div className="brand">Brand</div>
        </div>
        <div className="item">
          <div className="image"></div>
          <div className="brand">Brand</div>
        </div>
        <div className="item">
          <div className="image"></div>
          <div className="brand">Brand</div>
        </div>
      </div>
    </div>
  )
}

export default ItemsList