import { User } from "./user.model";

//Variables que se envian al back de los huertos en determinados casos
export class GardenC{
    constructor(
        public idGarden:number,
        public name: string,
        public latitude: number,
        public longitude: number,
        public description: string,
        public usuario: User
    ){}
}