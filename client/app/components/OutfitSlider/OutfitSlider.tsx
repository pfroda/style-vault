'use client';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from 'next/image';

const OutfitSlider = ({ items, width, height, category }) => {
  const sliderSettings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    dots: false,
  };

  return (
    <Slider {...sliderSettings} className={`${category}`}>
      {items.map((item, index) => (
        <div key={index} className={`img ${category}`}>
          <Image className="outfit-slider-img" width={width} height={height} src={item.url} alt="" />
        </div>
      ))}
    </Slider>
  );
}

export default OutfitSlider;
