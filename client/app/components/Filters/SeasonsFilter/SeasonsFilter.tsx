import './seasonsfilter.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFilter } from '@/app/GlobalRedux/Features/filter/filterSlice';

function SeasonsFilter() {
  const selectedSeason = useSelector((state) => state.filter.season);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Selected season:', selectedSeason);
  }, [selectedSeason]);

  const seasons = ['Winter', 'Spring', 'Summer', 'Autumn'];

  const handleSelectedSeason = (season) => {
    dispatch(setSelectedFilter({ type: 'season', value: [season] }));
  }

  return (
    <div className='SeasonsFilter'>
      <h4>Seasons</h4>
      <div className='filter-tags'>
        <ul className='filter-tags-list'>
          {seasons.map((season, index) => (
            <li key={index} onClick={() => handleSelectedSeason(season)}>{season}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SeasonsFilter;
