import './locationsfilter.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFilter } from '@/app/GlobalRedux/Features/filter/filterSlice';
import { queryLocations } from '@/app/services/apiGraphQL';
import useAuth from '@/app/hooks/useAuth';

function LocationsFilter() {
//   const selectedLocation = useSelector((state) => state.filter.location);
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const { user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await queryLocations(user?.id!);
        setLocations(res.data?.getLocations || [])
      } catch (error) {
        console.log(error)
      }
    };
    fetchLocations();

  }, [user?.id]);

  const handleSelectedLocation = async (location) => {

    if (location === selectedLocation) {
      dispatch(setSelectedFilter({ type: 'location', value: '' }));
      setSelectedLocation('');
    } else {
      dispatch(setSelectedFilter({ type: 'location', value: location }));
      setSelectedLocation(location)
    }
  }


  return (
    <div className='LocationsFilter'>
        <h4>Location</h4>
        <div className='filter-tags'>
        <ul className="filter-tags-list">
                    {locations.map((location, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelectedLocation(location)}
                            className={selectedLocation.includes(location) ? 'selected' : ''}
                        >
                            {location}
                        </li>
                    ))}
                </ul>
        </div>
    </div>
  )
}

export default LocationsFilter