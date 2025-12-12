import { Drink } from './drink';

export interface Bar {
  id: number;
  foursquare_place_id: string;
  formatted_address: string;
  name: string;
  drinks: Drink[];
}
