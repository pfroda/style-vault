import ItemContainer from '../Lists/ItemContainer/ItemContainer';
import ItemHeader from '../Lists/ItemHeader/ItemHeader';
import Footer from '../Footer/Footer';

function Proba() {
  const myUrl = 'http://res.cloudinary.com/dizg5ajyl/image/upload/v1697185079/file_har9cf.jpg';

  const itemCount = 25;

  const items = Array.from({ length: itemCount }, (_, index) => ({
    id: index + 1,
    url: myUrl,
    brand: `Marca ${index + 1}`,
  }));

  const honduras = 'Honduras'

  return (
    <>
      <ItemHeader closetName={honduras} />
      <ItemContainer items={items} />
      <Footer />
    </>
  );
}

export default Proba;





// const items = [
//   { id: 1, url: myUrl, brand: 'Marca 1' },
//   { id: 2, url: myUrl, brand: 'Marca 2' },
//   { id: 3, url: myUrl, brand: 'Marca 2' },
//   { id: 4, url: myUrl, brand: 'Marca 2' },
//   { id: 5, url: myUrl, brand: 'Marca 2' },
//   { id: 6, url: myUrl, brand: 'Marca 2' },
//   { id: 7, url: myUrl, brand: 'Marca 2' },
//   { id: 8, url: myUrl, brand: 'Marca 2' },
// ];