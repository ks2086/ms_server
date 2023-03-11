import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as NewsService from './news.service';


export const newsRouter = express.Router();

newsRouter.get('/', async(request: Request, response: Response) => {
    try{
        const news = await NewsService.listNews()
        return response.status(200).json(news)
    }
    catch(error: any){
        return response.status(500).json(error.message)
    }
});

newsRouter.get('/:id', async(request: Request, response: Response) => {
    const id : number = parseInt(request.params.id, 10);
    try{
        const news = await NewsService.singleNewsById(id)
        if(news){
            return response.status(200).json(news)
        }
        else{
            return response.status(404).json("News not found")
        }
    }
    catch(error: any){
        return response.status(500).json(error.message)
    }
});

// https://www.youtube.com/watch?v=PM58NEMJgMw&ab_channel=rithmic