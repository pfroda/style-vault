'use client';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from 'next/image';

const OutfitSlider = ({ items }) => {
  const sliderSettings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    dots: false,
  };

  return (
    <Slider {...sliderSettings} className="something">
      {items.map((item, index) => (
        <div key={index} className='img bottom'>
          <Image className="outfit-slider-img" width={200} height={200} src={item.url} alt="" />
        </div>
      ))}
    </Slider>
  );
}

export default OutfitSlider;
