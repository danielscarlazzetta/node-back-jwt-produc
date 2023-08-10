import { Request, Response } from "express" 
import { Product } from "../models/product.models"

export const newProduct = async (req : Request, res : Response) => {

    const { name, description, price, amount, category  } = req.body;

    const nname = await Product.findOne({where: {name : name}})

    const existingFields: any = [];

    try{
        if (nname) existingFields.push();

        await Product.create({
            name: name,
            description : description,
            price: price,
            amount: amount,
            category: category
        });
        res.json({
            msg: "productor creado con exito!",
        });
    }catch(err){
        res.status(400).json({
            msg: `${nname} ya existe`,
          });
    }
}

export const getProduct = async (req : Request, res : Response) => {

    const listProducts = await Product.findAll();

    res.json(listProducts);

    // res.json({
    //     msg: 'Get Products'
    // });
}