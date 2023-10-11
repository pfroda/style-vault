import './closet.css'

function Closet() {
  return (
    <div className='Closet'>
      <div className="closet-header">
        <div className="style-vault">Style-vault</div>
        <div className="profile">
          <div className="profile-content">
            <div className="img"></div>
            <div className="name">Natalie</div>
          </div>
          <div className="edit-profile">Edit</div>
        </div>
        <div className="header-options">
          <button className='closet-button'>Closet</button>
          <button className='outfit-button'>Outfits</button>
          <button className='loves-button'>Loves</button>
        </div>
      </div>

      <div className="user-closets">
        <div className="closets-container">
            <div className="closet-name">All Clothes</div>
        </div>
        <div className="closets-container">
            <div className="closet-name">Barcelona closet</div>
        </div>
        <div className="closets-container">
            <div className="closet-name">Honduras closet</div>
        </div>
        <div className="closets-container">
            <div className="closet-name">Add new closet</div>
        </div>
        <div className="closets-container">
            <div className="closet-name">Add new closet</div>
        </div>
      </div>
    </div>
  )
}

export default Closet