'use client';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from 'next/image';
import { useState, useEffect } from 'react';

const OutfitSlider = ({ items, width, height, category, index, onItemURLChange }) => {

  const [currentUrl, setCurrentUrl] = useState('');

  const sliderSettings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    dots: false,
    arrows: false,
    // beforeChange: (current, next) => {
    //   console.log(`Slide actual: ${next}`);
    //   // console.log('Item correspondiente:', items[next]);
    //   console.log('Item correspondiente:', items[next]?.itemUrl);
    // },
    beforeChange: (current, next) => {
      onItemURLChange(index, items[next]?.itemUrl);
    },
  };

  return (
    <Slider {...sliderSettings} className={`${category}`}>
      {items.map((item, index) => (
        <div key={index} className={`img ${category}`}>
          <Image className="outfit-slider-img" width={width} height={height} src={item.itemUrl} alt="" />
        </div>
      ))}
    </Slider>
  );
}

export default OutfitSlider;
