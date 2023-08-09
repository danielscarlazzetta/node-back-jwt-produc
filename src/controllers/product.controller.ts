import { Request, Response } from "express" 
import { Product } from "../models/product.models"


export const getProduct = async (req : Request, res : Response) => {

    const listProducts = await Product.findAll();

    res.json(listProducts);

    // res.json({
    //     msg: 'Get Products'
    // });
}