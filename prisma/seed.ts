import { db } from "../src/utils/db.server";
import bcrypt from "bcrypt";

async function hashPassword(password : string) : Promise<string> {
    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }
    catch (error : any){
        throw new Error(error.message);
    }
}


type User = {
    username: string;
    password: string;
}

type News = {
    title: string;
    slug: string;
    image: string | null;
    content: string | null;
}

async function seed(){
    await Promise.all(
        getUsers().map((user) => {
            hashPassword(user.password).then((hash) => {
                return db.user.create({
                    data : {
                        username: user.username,
                        password: hash
                    }
                })
            })
        })
    )
    const user = await db.user.findFirst({
        where: {
            username: "test@test.pl"
        }
    });

    await Promise.all(
        getNews().map((news) => {
            const {title, slug} = news;
            return db.news.create({
                data: {
                    title,
                    slug,
                    author: {connect: {id: 1}}
                }
            })
        })
    )
}

seed();


function getUsers() : Array<User> {
    return [
        {
            username: "test@test.pl",
            password: "tester"
        },
        {
            username: "test2@test.pl",
            password: "tester"
        }
    ];
}

function getNews() : Array<News> {
    return [
        {
            title: "Pierwszy news",
            slug: "pierwszy-news",
            image: null,
            content: null
        },
        {
            title: "Drugi news",
            slug: "drugi-news",
            image: null,
            content: null
        }
    ]
}