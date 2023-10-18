import './outfitcontainer.css';
import Outfit from '../Outfit/Outfit';

function OutfitContainer({ outfits }) {
  return (
    <div className="outfits-list-container">
      {outfits.map((outfit, index) => (
        <Outfit key={index} id={outfit.id} name={outfit.name} url={outfit.outfitUrl} />
      ))}
    </div>
  );
}

export default OutfitContainer;