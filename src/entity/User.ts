import {Entity, PrimaryGeneratedColumn, Column,Unique} from "typeorm";

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    userid: number;

    @Column()
    fullname: string;

    @Column({"unique":true})
   
    email: string;

    @Column()
    password: string;

    @Column()
    category:string


}
