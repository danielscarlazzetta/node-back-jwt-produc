import { Request, Response } from "express" 


export const getProduct = (req : Request, res : Response) => {
    res.json({
        msg: 'Get Products'
    })
}