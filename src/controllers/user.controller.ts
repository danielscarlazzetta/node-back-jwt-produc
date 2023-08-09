import { Request, Response } from "express";
import bcrypt, { hash } from 'bcrypt';
import { User } from "../models/user.models";


export const newUser = async (req : Request, res : Response) => {
    
    const { name, username, password, email, phone, address , typeofuser  } = req.body;

    const user = await User.findOne({where: {username : username} });
    const mail = await User.findOne({where: {email : email} });
    const hone = await User.findOne({where: {phone : phone} });
    

    const hashPassword = await bcrypt.hash(password, 10);
    const existingFields: any = [];
    
    try {

        if (user || mail || hone) {
            if (user) existingFields.push(`El usuario ${username}`);
            if (mail) existingFields.push(`El email ${email}`);
            if (hone) existingFields.push(`El teléfono ${phone}`);            
        };

        await User.create({
            name: name,
            username: username,
            password: hashPassword,
            email: email,
            phone: phone,
            address: address,
            typeofuser: typeofuser,
        });
        res.json({
            msg: `Usuario  ${username} creado con exito!`,
        });
    } catch (error) {
        res.status(400).json({
            msg: `${existingFields.join(', ')} ya existe`
          });
    }
}

export const loginUser = (req : Request, res : Response) => {
    
    //console.log(req.body);

    res.json({
        msg: 'Login User',
        body: req.body
    })
}