import './filters.css';
import { useState, useEffect } from 'react';

function Filters() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  useEffect(() => {
    console.log(selectedCategory)
  }, [selectedCategory])


  function handleFilterClick(event:any) {
    const category = event.target.textContent;
    setSelectedCategory(category);
  
    // here we call the queries of the selected category
  }

  return (
    <div className='Filter'>
        <div className="filters">
            {/* this should be a map of all the user categories */}
            <h4 onClick={handleFilterClick} className={selectedCategory === 'All' ? 'selected' : ''}>All</h4>
            <h4 onClick={handleFilterClick}>Trousers</h4>
            <h4 onClick={handleFilterClick}>Shirts</h4>
            <h4 onClick={handleFilterClick}>Shoes</h4>
            <h4 onClick={handleFilterClick}>Pants</h4>
            <h4 onClick={handleFilterClick}>Sockets</h4>
        </div>
    </div>
  )
}

export default Filters