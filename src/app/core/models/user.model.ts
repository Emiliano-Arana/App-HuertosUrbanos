import { Garden } from "./garden.model";

export class User {
    constructor(
        public idUser:number,
        public email: string,
        public name: string,
        public lastName: string,
        public password: string,
        public role: string,
        //relacion con los huertos
        public huertos: Garden[]
    ){}
}