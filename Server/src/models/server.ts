import express, { Application } from 'express';
import cors from 'cors';
import routesProduct from "../routes/product";
import routesUser from "../routes/user";
import { Product } from './product';
import { User } from './user';


class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '4001';
        this.listen();
        this.midlewares();
        this.routes();
        
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto' + this.port);

        })
    }

    routes(){
        this.app.use('/api/products', routesProduct);
        this.app.use('/api/users', routesUser);
    }

    midlewares(){

        this.app.use(express.json());

        this.app.use(cors());
    }

    async dbConnect(){
        try{
            await Product.sync()
            await User.sync();
        } catch (error){
            console.error('Unable to connect to the database:', error);

        }     
    }
}

export default Server;
