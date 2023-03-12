import { db } from "../../utils/db.server";

type News = {
    id: number;
    title: string;
    slug: string;
    createdAt: Date;
}

export const listNews = async () : Promise<News[]> => {
    return db.news.findMany({
        select: {
            id: true,
            title: true,
            slug: true,
            createdAt: true,
            author: {
                select: {
                    id: true,
                    username: true
                }
            }
        },
    })
}

export const singleNewsById = async (id: number) : Promise<News | null> => {
    return db.news.findUnique({
        select: {
            id: true,
            title: true,
            slug: true,
            createdAt: true,
            author: {
                select: {
                    id: true,
                    username: true
                }
            }
        },
        where: {
            id
        },
    })
}