import { Request, Response, NextFunction } from "express";



const validateToken = ( req: Request, res: Response, next: NextFunction) => {
    console.log('Validate Token');

    next()
    
}

export default validateToken;