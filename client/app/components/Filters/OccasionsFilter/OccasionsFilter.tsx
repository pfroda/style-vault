import './occasionsfilter.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFilter } from '@/app/GlobalRedux/Features/filter/filterSlice';

function OccasionsFilter() {
  return (
    <div className='OccasionsFilter'>
        <h4>Occasions</h4>
        <div className='filter-tags'>
            <ul className='filter-tags-list'>
                <li></li>
            </ul>
        </div>
    </div>
  )
}

export default OccasionsFilter