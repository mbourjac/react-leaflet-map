import { forwardRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../lib/tailwind';
import type { GalleryImage } from '../Home.types';
import { GalleryCardImage } from './GalleryCardImage';
import { GalleryCardInfo } from './GalleryCardInfo';
import { GalleryCardMap } from './GalleryCardMap';

type GalleryCardProps = GalleryImage & {
  className?: string;
};

export const GalleryCard = forwardRef<HTMLElement, GalleryCardProps>(
  ({ src, heading, date, coordinates, className }, ref?) => {
    const initialDisplayedContent = {
      isInfoDisplayed: true,
      isImageDisplayed: false,
      isMapDisplayed: false,
    };

    const [displayedContent, setDisplayedContent] = useState<{
      isInfoDisplayed: boolean;
      isImageDisplayed: boolean;
      isMapDisplayed: boolean;
    }>(initialDisplayedContent);

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
      setDisplayedContent(initialDisplayedContent);
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
          {isImageDisplayed && <GalleryCardImage src={src} heading={heading} />}
        </AnimatePresence>
        <AnimatePresence mode="wait" initial={false}>
          {isMapDisplayed && (
            <GalleryCardMap key="map" position={coordinates!} />
          )}
          {isInfoDisplayed && (
            <GalleryCardInfo
              key="info"
              heading={heading}
              date={date}
              coordinates={coordinates}
              isImageDisplayed={isImageDisplayed}
              handleDisplayMap={handleDisplayMap}
            />
          )}
        </AnimatePresence>
      </motion.article>
    );
  },
);

GalleryCard.displayName = 'GalleryImage';
