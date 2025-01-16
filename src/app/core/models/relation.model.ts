import { Garden } from "./garden.model";
import { Product } from "./product.model";

//coleccion entre huertos y productos
export class Relation{
    constructor(
        public huerto:Garden,
        public producto:Product,
        public stock: number
    ){}
}