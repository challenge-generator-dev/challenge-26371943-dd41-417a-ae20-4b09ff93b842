import 'reflect-metadata';
import express, { Application } from 'express';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ProductCreateDTO, ProductUpdateDTO } from './dtos/product.dto';
import { ValidationException } from './exceptions/validation.exception';
import { errorHandler } from './middlewares/errorHandler';
import { productsRouter } from './routes/products';

class Server {
    private app: Application;
    private port: number;

    constructor(port: number = 3000) {
        this.port = port;
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    private initializeMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initializeRoutes(): void {
        this.app.use('/api/products', productsRouter);
    }

    private initializeErrorHandling(): void {
        this.app.use(errorHandler);
    }

    public async start(): Promise<void> {
        this.app.listen(this.port, () => {
            console.log(`Server running on http://localhost:${this.port}`);
        });
    }
}

const validateModels = async (): Promise<void> => {
    const productCreateDTO = plainToClass(ProductCreateDTO, {
        name: 'Test Product',
        price: 100,
        description: 'Test Description'
    });
    const errors = await validate(productCreateDTO);
    if (errors.length > 0) {
        console.error('Error en la validación de modelos:', errors);
        process.exit(1);
    }
};

(async () => {
    try {
        await validateModels();
        const server = new Server();
        await server.start();
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
})();