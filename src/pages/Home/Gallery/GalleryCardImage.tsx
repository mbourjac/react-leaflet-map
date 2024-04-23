import { motion } from 'framer-motion';
import type { GalleryImage } from '../Home.types';

type GalleryCardImageProps = Pick<GalleryImage, 'src' | 'heading'>;

export const GalleryCardImage = ({ src, heading }: GalleryCardImageProps) => {
  return (
    <div className="absolute">
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.4 } }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        src={src}
        alt={heading.join(', ')}
        className="aspect-[3/2] object-cover object-center"
      />
    </div>
  );
};
