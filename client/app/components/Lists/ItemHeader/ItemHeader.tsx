import './itemheader.css'

import { useState } from 'react';

function ItemHeader({ closetName, headers, onHeaderClick }) {
  const [activeButton, setActiveButton] = useState('closet');

  const handleButtonClick = (buttonId: string) => {
    setActiveButton(buttonId);
    onHeaderClick(buttonId);
  };

  return (
    <div className='ItemHeader'>
      <h2><span className='closet-title'>{closetName}</span></h2>
      <div className="items-list-header">
        <div className="header-options">
          {Object.keys(headers).map((key) => (
            <button key={key} className={`${key}-button ${activeButton === key ? 'active' : ''}`} onClick={() => handleButtonClick(key)}>{headers[key]}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ItemHeader