import './categoryfilter.css';
import useAuth from '@/app/hooks/useAuth';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFilter } from '@/app/GlobalRedux/Features/filter/filterSlice';

function CategoryFilter() {
  const selectedFilter = useSelector((state) => state.filter.category);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const dispatch = useDispatch();

  // categories - would prob need a separate doc
  const categories = [
  'All',
  'Pants',
  'Tops',
  'Shirts',
  'Shoes',
  'Boots',
  'Bags',
  'Accessories',
  'Sandals',
  'Sneakers',
  'Heels',
  'Outwear',
  'Dresses',
  'Shorts',
  'One-Piece'
];

  function handleFilterClick(event:any) {
    const category = event.target.textContent;
    dispatch(setSelectedFilter({ type: 'category', value: category }));

  }

  return (
    <div className='Filter'>
      <div className="category-filter">
        <ul>
        {categories.map((category) => (
          <li key={category}>
            <h4 onClick={handleFilterClick} className={selectedCategory === 'category' ? 'selected' : ''}>
            {category}
            </h4>
          </li>
        ))}
          </ul>
      </div>
    </div>
  )
}

export default CategoryFilter;