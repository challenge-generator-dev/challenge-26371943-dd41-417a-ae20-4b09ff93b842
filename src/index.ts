import express, { Application, Request, Response, NextFunction } from 'express';
import { productsRouter } from './routes/products';
import { errorHandler } from './middlewares/errorHandler';

export function createApp(): Application {
    const app: Application = express();
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    app.get('/health', (_req: Request, res: Response) => {
        res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
    });
    
    app.use('/api', productsRouter);
    
    app.use(errorHandler);
    
    return app;
}

if (require.main === module) {
    const app = createApp();
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    
    app.listen(port, () => {
        console.log(`Servidor ejecutándose en el puerto ${port}`);
        console.log(`Endpoints disponibles en http://localhost:${port}/api`);
    });
}