import { cn } from '../../../lib/tailwind';
import type { GalleryImage as GalleryImageType } from '../Home.types';
import { GalleryImage } from './GalleryImage';

type GalleryProps = {
  images: GalleryImageType[];
};

export const Gallery = ({ images }: GalleryProps) => {
  return (
    <section className="flex w-full flex-col gap-3 @container">
      <div className="grid w-full grid-cols-1 gap-3 @[400px]:grid-cols-[repeat(auto-fill,minmax(400px,1fr))]">
        {images.map((image, index) => (
          <GalleryImage
            key={index}
            {...image}
            className={cn(index === 0 && 'col-end-[-1]')}
          />
        ))}
      </div>
    </section>
  );
};
