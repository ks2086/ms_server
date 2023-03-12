import express from "express";
import type { Request, Response } from "express";

import * as UserService from './user.service';

export const userRouter = express.Router();

userRouter.get('/', async(request: Request, response: Response) => {
    try{
        const news = await UserService.listUsers()
        return response.status(200).json(news)
    }
    catch(error: any){
        return response.status(500).json(error.message)
    }
});

userRouter.get('/:id', async(request: Request, response: Response) => {
    const id : number = parseInt(request.params.id, 10);
    try{
        const news = await UserService.singleUserById(id)
        if(news){
            return response.status(200).json(news)
        }
        else{
            return response.status(404).json({msg: "User not found"})
        }
    }
    catch(error: any){
        return response.status(500).json(error.message)
    }
})