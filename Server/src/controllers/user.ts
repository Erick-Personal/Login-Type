import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { User } from "../models/user";
import jwt from 'jsonwebtoken';

export const newUser = async (req: Request, res: Response) => {

    const { username, password } = req.body;

    //Validamos si el usuario existe en la base de datos
    const user: any = await User.findOne({ where: { username: username } });

    if(user) { 
         res.status(400).json({
            msg: 'Ya existe un usuario con el nombre'
        })
    }

  
   
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        //guardamos usuario en base de datos
        await User.create({
            username: username,
            password: hashedPassword
        })
    
        res.json({
            msg: 'usuario creado exitosamente'
            
        })

    } catch (error) {

        res.status(400).json({
            msg: 'Upps ocurrior un error',
            error
        })
        
    }
}



export const LoginUser = async (req: Request, res: Response) => {

    const { username, password } = req.body;

    //validamos si el usuario existe en la base de datos
    const user: any = await User.findOne({ where: { username: username }});
    if(!user) {
        return res.status(400).json({
            msg: 'No existe un usuario con el nombre en la base de datos'
        })
    }

    //validamos usuario
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!passwordValid){
        return res.status(400).json({
            msg: 'Password incorrecto'
        })
    }

    //generador de token
    const token = jwt.sign({
        username: username
    }, process.env.SECRET_KEY || 'pepito123' )

    res.json(token);

}

