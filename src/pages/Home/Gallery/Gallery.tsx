import { useRef } from 'react';
import tailwindConfig from '../../../../tailwind.config';
import { useElementSize } from '../../../hooks/use-element-size';
import { cn } from '../../../lib/tailwind';
import type { GalleryImage as GalleryImageType } from '../Home.types';
import { GalleryImage } from './GalleryImage';

type GalleryProps = {
  images: GalleryImageType[];
};

export const Gallery = ({ images }: GalleryProps) => {
  const firstImageRef = useRef(null);
  const { elementHeight: firstImageHeight } = useElementSize(firstImageRef);

  const firstImageHeightInRem = firstImageHeight / 16;
  const mainSpacing = tailwindConfig.theme.extend.spacing.main;
  const sectionOffset = `calc(-${firstImageHeightInRem}rem - ${mainSpacing} * 2)`;

  return (
    <section
      className="relative flex flex-col p-main @container"
      style={{
        marginTop: sectionOffset,
      }}
    >
      <div className="grid grid-cols-1 gap-main @[400px]:grid-cols-[repeat(auto-fill,minmax(400px,1fr))]">
        {images.map((image, index) => (
          <GalleryImage
            key={index}
            {...image}
            ref={index === 0 ? firstImageRef : undefined}
            className={cn(index === 0 && 'col-end-[-1]')}
          />
        ))}
      </div>
    </section>
  );
};
