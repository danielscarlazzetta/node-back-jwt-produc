import { Request, Response } from "express";
import { Product } from "../models/product.models";


export const getProduct = async (req : Request, res : Response) => {

    try{
        const listProducts = await Product.findAll();
        res.json(listProducts);

    }catch(err){
        res.status(400).json({
            msg: `${err}`,
          });
    }
};

export const newProduct = async (req : Request, res : Response) => {

    const { name, description, price, amount, category  } = req.body;

    try{
        const existingProduct  = await Product.findOne({where: {name : name}})
        if(existingProduct ) {
           return res.json(`${name} ya existe`);
        }
        await Product.create({
            name: name,
            description : description,
            price: price,
            amount: amount,
            category: category
        });

        return res.json({
            msg: "Producto creado con éxito!",
        });

    }catch(err){
        return res.status(400).json({
            msg: `Error`,
            err,
          });
    }
};