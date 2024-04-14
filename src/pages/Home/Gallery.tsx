import { type Variants, motion } from 'framer-motion';
import type { GalleryImage } from './Home.types';

type GalleryProps = {
  images: GalleryImage[];
};

export const Gallery = ({ images }: GalleryProps) => {
  const restTransition = {
    duration: 0.2,
  };

  const hoverTransition = {
    duration: 0.4,
  };

  const imageMotion: Variants = {
    rest: {
      opacity: 0,
      transition: restTransition,
    },
    hover: {
      opacity: 1,
      transition: hoverTransition,
    },
  };

  const textMotion: Variants = {
    rest: {
      color: '#000',
      transition: restTransition,
    },
    hover: {
      color: '#fff',
      transition: hoverTransition,
    },
  };

  return (
    <section className="grid w-full grid-cols-[repeat(auto-fit,minmax(480px,1fr))] gap-3">
      {images.map(({ src, heading, date }, index) => (
        <motion.article
          key={index}
          className="relative aspect-[3/2] overflow-hidden font-medium uppercase"
          initial="rest"
          animate="rest"
          whileHover="hover"
        >
          <div className="absolute h-full w-full border border-black" />
          <div className="absolute">
            <motion.img
              src={src}
              alt={heading.join(', ')}
              variants={imageMotion}
              className="aspect-[3/2] object-cover object-center"
            />
          </div>
          <motion.div
            className="relative flex h-full flex-col justify-between"
            variants={textMotion}
          >
            <h2 className="flex flex-col p-3">
              {heading.map((item, index) => (
                <span key={index} className="inline-block">
                  {item}
                </span>
              ))}
            </h2>
            <div className="p-3 text-sm">
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
          </motion.div>
        </motion.article>
      ))}
    </section>
  );
};
