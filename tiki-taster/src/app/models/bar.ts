import { Drink } from './drink';

export interface Bar {
    id: number;
    name: String;
    drinks: Drink[];
}