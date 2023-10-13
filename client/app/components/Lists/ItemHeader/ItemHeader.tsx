import './itemheader.css'

function ItemHeader({ closetName }) {
  return (
    <div className='ItemHeader'>
      <h2>{closetName}</h2>
      <div className="items-list-header">
        <div className="header-options">
          <button className='closet-button'>Closet</button>
          <button className='outfit-button'>Outfits</button>
        </div>
      </div>
    </div>
  )
}

export default ItemHeader