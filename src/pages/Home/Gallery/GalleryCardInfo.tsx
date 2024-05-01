import { motion } from 'framer-motion';
import { CharactersRandomizer } from '../../../components/CharactersRandomizer';
import { PinIcon } from '../../../components/PinIcon';
import type { GalleryImage } from '../Home.types';

type GalleryCardInfoProps = Omit<GalleryImage, 'src'> & {
  isImageDisplayed: boolean;
  handleDisplayMap: () => void;
  isCardTouched: boolean;
  isCardHovered: boolean;
};

export const GalleryCardInfo = ({
  location,
  date,
  coordinates,
  isImageDisplayed,
  handleDisplayMap,
  isCardTouched,
  isCardHovered,
}: GalleryCardInfoProps) => {
  const FIRST_GRADE_KANJI =
    '一七九二人入八力十下三上千口土夕大女子小山川中五六円天手文日月木水火犬王出右四左本正玉生田白目石立休先名字年早気百竹糸耳虫村男町花見貝赤足車学林空金雨青草音校森';

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
      <h2 className="flex w-fit flex-col p-main">
        {!isCardTouched ?
          location.en.map((item, index) => <span key={index}>{item}</span>)
        : location.ja.map((item, index) => (
            <CharactersRandomizer
              key={index}
              className="inline-block"
              isConcurrent
              referenceString={item}
              eligibleCharacters={FIRST_GRADE_KANJI}
              useDefaultCharacters
              isReverse={!isCardHovered}
              reversedString={location.en[index]!}
            />
          ))
        }
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
