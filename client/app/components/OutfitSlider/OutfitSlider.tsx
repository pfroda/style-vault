'use client';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from 'next/image';
import { useState } from 'react';

const OutfitSlider = ({ items, width, height, category }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  console.log(items);

  const sliderSettings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    dots: false,
    arrows: true,
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