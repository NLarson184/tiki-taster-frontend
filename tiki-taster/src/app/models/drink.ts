import { Bar } from './bar';
import { Rating } from './rating';
import { Tag } from './tag';

export interface Drink {
  id: number;
  name: string;
  bar: Bar;
  ratings: Rating[];
  tags: Tag[];
  image_urls: string[];

  // Aggregated Fields from back-end.
  average_overall_rating: number | null;
  average_taste_rating: number | null;
  average_presentation_rating: number | null;
}
