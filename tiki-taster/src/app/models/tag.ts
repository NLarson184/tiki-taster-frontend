import { Drink } from './drink';

export interface Tag {
  id: number;
  name: string;
  drinks: Array<Drink>;
}
