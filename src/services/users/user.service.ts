import { db } from "../../utils/db.server";

type User = {
    id: number;
    username: string;
    createdAt: Date;
}

export const listUsers = async () : Promise<User[]> => {
    return db.user.findMany({
        select: {
            id: true,
            username: true,
            createdAt: true
        }
    }) 
} 

export const singleUserById = async (id : number) : Promise<User | null> => {
    return db.user.findUnique({
        select: {
            id: true,
            username: true,
            createdAt: true
        },
        where: {id}
    })
}