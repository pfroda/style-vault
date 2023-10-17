import './occasionsfilter.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFilter } from '@/app/GlobalRedux/Features/filter/filterSlice';
import { queryOccasions } from '@/app/services/apiGraphQL';
import useAuth from '@/app/hooks/useAuth';

function OccasionsFilter() {
  const selectedOccasions = useSelector((state) => state.filter.occasion);
  const [occasions, setOccasions] = useState<string[]>([]);
  const { user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOccasions = async () => {
      try {
        const res = await queryOccasions(user?.id!);
        setOccasions(res.data?.getOccasions || [])
      } catch (error) {
        console.log(error)
      }
    };
    fetchOccasions();

  }, [user?.id]);

  const handleSelectedOccasion = async (occasion) => {
    let updatedOccasions;

    if (selectedOccasions.includes(occasion)) {
      updatedOccasions = selectedOccasions.filter((selected) => selected !== occasion)
    } else {
      updatedOccasions = [...selectedOccasions, occasion];
    }
    dispatch(setSelectedFilter({ type: 'occasion', value: updatedOccasions }));
  }

  return (
    <div className='OccasionsFilter'>
        <h4>Occasion</h4>
        <div className='filter-tags'>
        <ul className="filter-tags-list">
                    {occasions.map((occasion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelectedOccasion(occasion)}
                            className={selectedOccasions.includes(occasion) ? 'selected' : ''}
                        >
                            {occasion}
                        </li>
                    ))}
                </ul>
        </div>
    </div>
  )
}

export default OccasionsFilter