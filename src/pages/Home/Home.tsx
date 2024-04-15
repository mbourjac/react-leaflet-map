import { Gallery } from './Gallery/Gallery';
import { GALLERY_IMAGES } from './Home.constants';

export const Home = () => {
  return (
    <div className="flex justify-center p-3">
      <Gallery images={GALLERY_IMAGES} />
    </div>
  );
};
