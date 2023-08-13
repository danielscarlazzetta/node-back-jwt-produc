import { Request, Response } from "express";
import bcrypt, { hash } from 'bcrypt';
import { User } from '../models/user.models';
import jwt from 'jsonwebtoken';
import validator from 'validator';


export const newUser = async (req: Request, res: Response) => {

    const { name, username, password, email, phone, address, typeofuser } = req.body;

    const user = await User.findOne({ where: { username: username } });
    const mail = await User.findOne({ where: { email: email } });
    const hone = await User.findOne({ where: { phone: phone } });

    if (!validator.isAlphanumeric(name)) {
        return res.status(400).json({
            msg: `El nombre debe contener solo letras y números`,
        });
    };
    if (!validator.isAlphanumeric(username)) {
        return res.status(400).json({
            msg: `El username debe contener solo letras y números`,
        });
    };
    if (!validator.isAlphanumeric(address)) {
        return res.status(400).json({
            msg: `La direccion debe contener solo letras y números`,
        });
    };


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

export const getAllUser = async (req: Request, res: Response) => {

    const listUser = await User.findAll();
    res.json(listUser);

}

export const loginUser = async (req: Request, res: Response) => {

    const { username, password } = req.body;
    const userName: any = await User.findOne({ where: { username: username } });
    if (!validator.isAlphanumeric(username)) {
        return res.status(400).json({
            msg: `El nombre debe contener solo letras y números`,
        });
    };

    try {
        if (!userName) {
            return res.status(400).json({
                msg: `no existe en la base de datos`,
            });
        };

        const passwordValid = await bcrypt.compare(password, userName.password);

        if (!passwordValid) {
            return res.status(400).json({
                msg: `password incorrecto`,
            });
        }

        const token = jwt.sign({
            username: username
        }, process.env.SECRET_KEY || '634kjbOHs99hSSDkn', { expiresIn: '10000000'});//10000

        res.json({ token });
        
    } catch (error) {
        res.json({
            msg: `error`
        });
    }
}

export const getIdUsers = async (req : Request, res : Response) => {

    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                msg: `Producto no encontrado`,
            });
        }

        res.json(user);
    } catch (err) {
        console.error('Error al obtener el usuario:', err);
        res.status(500).json({
            msg: `Error al obtener el usuario`,
            err,
        });
    }
};

export const updateUser = async (req : Request, res : Response) => {
    const userId = req.params.id;
    const { name, username, password, email, phone, address, typeofuser } = req.body;

    if (!validator.isAlphanumeric(name)) {
        return res.status(400).json({
            msg: `El nombre debe contener solo letras y números`,
        });
    };
    if (!validator.isAlphanumeric(username)) {
        return res.status(400).json({
            msg: `El username debe contener solo letras y números`,
        });
    };
    if (!validator.isAlphanumeric(address)) {
        return res.status(400).json({
            msg: `La direccion debe contener solo letras y números`,
        });
    };
    
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                msg: `Producto no encontrado`,
            });
        }

        await user.update({
            name: name,
            username: username,
            password: password,
            email: email,
            phone: phone,
            address: address,
            typeofuser: typeofuser
        });

        res.json({
            msg: `Usuario ${username} actualizado con éxito`,
        });
    } catch (err) {
        res.status(500).json({
            msg: `Error al actualizar el usuario`,
        });
    }
};

export const deleteUser = async (req : Request, res : Response) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                msg: `Usuario no encontrado`,
            });
        }

        await user.destroy();

        res.json({
            msg: `Usuario eliminado con éxito`,
        });
    } catch (err) {
        res.status(500).json({
            msg: `Error al eliminar el usuario`,
        });
    }
};



