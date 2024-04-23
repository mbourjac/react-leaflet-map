import { motion } from 'framer-motion';
import { PinIcon } from '../../../components/PinIcon';
import type { GalleryImage } from '../Home.types';

type GalleryCardInfoProps = Omit<GalleryImage, 'src'> & {
  isImageDisplayed: boolean;
  handleDisplayMap: () => void;
};

export const GalleryCardInfo = ({
  heading,
  date,
  coordinates,
  isImageDisplayed,
  handleDisplayMap,
}: GalleryCardInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, color: '#000' }}
      animate={{
        opacity: 1,
        color: isImageDisplayed ? '#fff' : '#000',
        transition: {
          duration: isImageDisplayed ? 0.4 : 0.2,
        },
      }}
      exit={{
        opacity: 0,
        transition: { duration: 0 },
      }}
      className="relative flex h-full flex-col justify-between"
    >
      <h2 className="flex flex-col p-main">
        {heading.map((item, index) => (
          <span key={index} className="inline-block">
            {item}
          </span>
        ))}
      </h2>
      <div className="flex justify-between text-sm">
        <div className="p-main">
          <p>
            {new Intl.DateTimeFormat('en-GB', {
              timeStyle: 'medium',
            }).format(date)}
          </p>
          <p>
            {new Intl.DateTimeFormat('en-GB', {
              dateStyle: 'long',
            }).format(date)}
          </p>
        </div>
        {coordinates && (
          <button className="flex items-end p-main" onClick={handleDisplayMap}>
            <span className="inline-block">
              <PinIcon />
            </span>
          </button>
        )}
      </div>
    </motion.div>
  );
};
