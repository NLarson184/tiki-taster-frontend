import { Drink } from "./drink";

export interface Tag {
    id: number;
    name: String;
    drinks: Array<Drink>;
}