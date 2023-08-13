import { Request, Response } from "express";
import bcrypt, { hash } from 'bcrypt';
import { User } from '../models/user.models';
import jwt from 'jsonwebtoken';


export const newUser = async (req: Request, res: Response) => {

    const { name, username, password, email, phone, address, typeofuser } = req.body;

    const user = await User.findOne({ where: { username: username } });
    const mail = await User.findOne({ where: { email: email } });
    const hone = await User.findOne({ where: { phone: phone } });


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
        }, process.env.SECRET_KEY || '634kjbOHs99hSSDkn', { expiresIn: '100000'});

        res.json({ token });
    } catch (error) {
        res.json({
            msg: `error`
        })
    }


}




export const loginUser2 = async (req: Request, res: Response) => {

    const { username, email, password } = req.body;
    const userName: any = await User.findOne({ where: { username: username } });
    const emailCorreo = await User.findOne({ where: { email: email } });

    if (!userName || !emailCorreo) {
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
}
