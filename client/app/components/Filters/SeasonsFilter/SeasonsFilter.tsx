import './seasonsfilter.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFilter } from '@/app/GlobalRedux/Features/filter/filterSlice';

function SeasonsFilter() {
  const seasons = ['Winter', 'Spring', 'Summer', 'Autumn'];
  const selectedSeasons = useSelector((state) => state.filter.season);
  const dispatch = useDispatch();

  const handleSelectedSeason = (season) => {
    let updatedSeasons;

    if (selectedSeasons.includes(season)) {
      updatedSeasons = selectedSeasons.filter((selected) => selected !== season);
    } else {
      updatedSeasons = [...selectedSeasons, season];
    }
    dispatch(setSelectedFilter({ type: 'season', value: updatedSeasons }));
  }

  return (
    <div className='SeasonsFilter'>
      <h4>Season</h4>
      <div className='filter-tags'>
        <ul className='filter-tags-list'>
          {seasons.map((season, index) => (
            <li
              key={index}
              onClick={() => handleSelectedSeason(season)}
              className={selectedSeasons.includes(season) ? 'selected' : ''}
            >
              {season}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SeasonsFilter;
