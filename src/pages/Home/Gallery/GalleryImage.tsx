import { forwardRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../lib/tailwind';
import type { GalleryImage as GalleryImageType } from '../Home.types';
import { GalleryImageMap } from './GalleryImageMap';

type GalleryImageProps = GalleryImageType & {
  className?: string;
};

export const GalleryImage = forwardRef<HTMLElement, GalleryImageProps>(
  ({ src, heading, date, coordinates, className }, ref?) => {
    const [displayedContent, setDisplayedContent] = useState<{
      isInfoDisplayed: boolean;
      isImageDisplayed: boolean;
      isMapDisplayed: boolean;
    }>({
      isInfoDisplayed: true,
      isImageDisplayed: false,
      isMapDisplayed: false,
    });

    const { isInfoDisplayed, isImageDisplayed, isMapDisplayed } =
      displayedContent;

    const handleDisplayImage = () => {
      if (isMapDisplayed) return;

      setDisplayedContent({
        isInfoDisplayed: true,
        isImageDisplayed: true,
        isMapDisplayed: false,
      });
    };

    const handleDisplayMap = () => {
      setDisplayedContent({
        isInfoDisplayed: false,
        isImageDisplayed: false,
        isMapDisplayed: true,
      });
    };

    const handleResetContent = () => {
      setDisplayedContent({
        isInfoDisplayed: true,
        isImageDisplayed: false,
        isMapDisplayed: false,
      });
    };

    return (
      <motion.article
        ref={ref}
        className={cn(
          'relative aspect-[3/2] overflow-hidden bg-white font-medium uppercase',
          className,
        )}
        onMouseEnter={handleDisplayImage}
        onMouseLeave={handleResetContent}
      >
        <div className="absolute size-full border border-black" />
        <AnimatePresence>
          {isImageDisplayed && (
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
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait" initial={false}>
          {isMapDisplayed && (
            <motion.div
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.1 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="absolute z-0 h-full w-full border border-transparent"
            >
              <GalleryImageMap position={coordinates!} />
            </motion.div>
          )}
          {isInfoDisplayed && (
            <motion.div
              key="info"
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
                  <button
                    className="flex items-end p-main"
                    onClick={handleDisplayMap}
                  >
                    <span className="inline-block">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>
    );
  },
);

GalleryImage.displayName = 'GalleryImage';
