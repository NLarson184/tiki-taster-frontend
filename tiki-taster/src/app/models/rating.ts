import { Drink } from './drink';
import { Bar } from './bar';

export interface Rating {
  id: number;
  drink: Drink;
  bar: Bar;
  overall_rating: number;
}

// Uses Python naming (SNAKE_CASE)
export interface NewRating {
  bar_id: string;
  bar_name: string;
  bar_address: string;
  drink_name: string;
  overall_rating: number;
  taste_rating: number | undefined;
  presentation_rating: number | undefined;
  tag_list: string[];
}
