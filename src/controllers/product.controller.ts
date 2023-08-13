import { Request, Response } from "express";
import { Product } from "../models/product.models";

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

export const getIdProduct = async (req : Request, res : Response) => {

    const productId = req.params.id;
    console.log(productId);

    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({
                msg: `Producto no encontrado`,
            });
        }

        res.json(product);
    } catch (err) {
        console.error('Error al obtener el producto:', err);
        res.status(500).json({
            msg: `Error al obtener el producto`,
            err,
        });
    }
};

export const updateProduct = async (req : Request, res : Response) => {
    const productId = req.params.id;
    const { name, description, price, amount, category } = req.body;

    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({
                msg: `Producto no encontrado`,
            });
        }

        await product.update({
            name: name,
            description: description,
            price: price,
            amount: amount,
            category: category,
        });

        res.json({
            msg: `Producto ${name} actualizado con éxito`,
        });
    } catch (err) {
        res.status(500).json({
            msg: `Error al actualizar el producto`,
        });
    }
};

export const deleteProduct = async (req : Request, res : Response) => {
    const productId = req.params.id;

    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({
                msg: `Producto no encontrado`,
            });
        }

        await product.destroy();

        res.json({
            msg: `Producto eliminado con éxito`,
        });
    } catch (err) {
        res.status(500).json({
            msg: `Error al eliminar el producto`,
        });
    }
};