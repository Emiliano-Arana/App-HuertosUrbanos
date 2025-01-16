import { Product } from "./product.model";

export class GardenProduct{
    constructor(
        public idGardenProduct:number,
        public producto: Product,
        public stock: number
    ){}
}