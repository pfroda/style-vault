import './categoryfilter.css';
import useAuth from '@/app/hooks/useAuth';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFilter } from '@/app/GlobalRedux/Features/filter/filterSlice';
import { queryItemsByCategory } from '@/app/services/apiGraphQL';

function CategoryFilter() {
  const selectedFilter = useSelector((state) => state.filter.category);
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const { user } = useAuth();

  // categories - would need a separate doc
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
    console.log(category)
  }

  return (
    <div className='Filter'>
      <div className="filters">
        <ul>
        {categories.map((category) => (
          <li key={category}>
            <h4 onClick={handleFilterClick} className={selectedCategory === 'All' ? 'selected' : ''}>
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