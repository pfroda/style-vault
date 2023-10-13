import './filters.css';
import useAuth from '@/app/hooks/useAuth';
// import { Item } from '../../Interfaces';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFilter } from '@/app/GlobalRedux/Features/filter/filterSlice';
import { queryItemsByCategory } from '@/app/services/apiGraphQL';


function Filters() {
  const selectedFilter = useSelector((state) => state.filter.category);
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // categories
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


  useEffect(() => {
    const fetchItemsbyCategory = async () => {
      try {
        const res = await queryItemsByCategory(user?.id!, selectedCategory)
        console.log(res);

      } catch (error) {
        setError('network error')
      }
    };
  
    console.log(selectedCategory);
    console.log('selected filter:', selectedFilter)
    fetchItemsbyCategory();

  }, [user?.id, selectedCategory])


  function handleFilterClick(event:any) {
    const category = event.target.textContent;
    // setSelectedCategory(category);
    dispatch(setSelectedFilter(category))
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

export default Filters