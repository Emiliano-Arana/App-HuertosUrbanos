import { GardenProduct } from "./gardenProduct.model";

export class Garden{
    constructor(
        public idGarden:number,
        public name: string,
        public latitude: number,
        public longitude: number,
        public description: string,
        public huertoProductos: GardenProduct[]
    ){}
}