import express from 'express';
import cors from 'cors';
import routesProduct from '../routes/product.routes';
import routesUsers from '../routes/user.routes';
import { Product } from './product.models';
import { User } from './user.models';


class Server {

    private app: express.Application;
    private port: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('corriendo en puerto = ' + this.port);
        });
    }

    routes(){
        this.app.use('/api/products', routesProduct);
        this.app.use('/api/users', routesUsers);
    }

    midlewares(){
        this.app.use(express.json());
        this.app.use(cors());
    }

    async dbConnect(){ 
        try{
            await Product.sync();
            await User.sync();
            console.log('Connection has been stablished successfully. =D')
        }catch(error){
            console.error('Unable to connect to the DataBase: ', error);
        }
    }
}

export default Server;