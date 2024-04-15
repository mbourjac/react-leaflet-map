import { Hero } from '../Hero';
import { Gallery } from './Gallery/Gallery';
import { GALLERY_IMAGES } from './Home.constants';

export const Home = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <Gallery images={GALLERY_IMAGES} />
    </div>
  );
};
