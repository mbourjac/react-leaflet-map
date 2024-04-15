import { forwardRef } from 'react';
import { type Variants, motion } from 'framer-motion';
import { cn } from '../../../lib/tailwind';
import type { GalleryImage as GalleryImageType } from '../Home.types';

type GalleryImageProps = GalleryImageType & {
  className?: string;
};

export const GalleryImage = forwardRef<HTMLElement, GalleryImageProps>(
  ({ src, heading, date, className }, ref?) => {
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
      <motion.article
        ref={ref}
        className={cn(
          'relative aspect-[3/2] overflow-hidden bg-white font-medium uppercase',
          className,
        )}
        initial="rest"
        animate="rest"
        whileHover="hover"
      >
        <div className="absolute size-full border border-black" />
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
          <h2 className="p-main flex flex-col">
            {heading.map((item, index) => (
              <span key={index} className="inline-block">
                {item}
              </span>
            ))}
          </h2>
          <div className="p-main text-sm">
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
    );
  },
);

GalleryImage.displayName = 'GalleryImage';
