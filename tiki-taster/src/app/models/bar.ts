import { Drink } from './drink';

export interface Bar {
    id: number;
    name: string;
    drinks: Drink[];
}