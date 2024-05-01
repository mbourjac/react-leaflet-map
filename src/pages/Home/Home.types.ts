export type GalleryImage = {
  src: string;
  location: {
    en: string[];
    ja: string[];
  };
  date: Date;
  coordinates?: [number, number];
};
