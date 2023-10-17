import './outfitsubmit.css';
import homeImage from '../../../public/home-image3.png';
import homeImage1 from '../../../public/home.png';
import homeImage2 from '../../../public/home-image.png';
// import { Canvas, Image as CanvasImage } from 'canvas';
// import { createCanvas, loadImage, CanvasRenderingContext2D } from 'canvas';
import { useState } from 'react';
import mergeImages from 'merge-images';

function OutfitSubmit() {
  const [mergedImage, setMergedImage] = useState(null);
  // const url = 'http://res.cloudinary.com/dizg5ajyl/image/upload/v1697185079/file_har9cf.jpg';
  // const eyesUrl = 'http://res.cloudinary.com/dizg5ajyl/image/upload/v1697185079/file_har9cf.jpg';
  // const mouthUrl = 'http://res.cloudinary.com/dizg5ajyl/image/upload/v1697185079/file_har9cf.jpg';
  const bodyUrl = homeImage;
  const eyesUrl = homeImage1;
  const mouthUrl = homeImage2;

  const handleMerge = () => {
    console.log('hey', bodyUrl);
    mergeImages([bodyUrl, eyesUrl, mouthUrl])
    .then(b64 => {
      console.log('Merged Image:', b64);
      setMergedImage(b64);
    })
    .catch(error => {
      console.error('Error merging images:', error);
    });
  }

  return (
    <div className='OutfitSubmit'>
      <div className="outfit" onClick={handleMerge}>
          hey
      </div>
      <div className="hola">Heyho</div>
      {mergedImage && <img src={mergedImage} alt="Merged Image" />}
    </div>
  )
}

export default OutfitSubmit