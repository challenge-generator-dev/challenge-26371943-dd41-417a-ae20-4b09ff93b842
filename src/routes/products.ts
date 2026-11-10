import { Router, Request, Response, NextFunction } from 'express';
import { ProductsController } from '../controllers/products.controller';

export const productsRouter: Router = Router();

const productsController = new ProductsController();

productsRouter.get('/products', async (req: Request, res: Response, next: NextFunction) => {
    await productsController.getAllProducts(req, res, next);
});

productsRouter.get('/products/:id', async (req: Request, res: Response, next: NextFunction) => {
    await productsController.getProductById(req, res, next);
});

productsRouter.post('/products', async (req: Request, res: Response, next: NextFunction) => {
    await productsController.createProduct(req, res, next);
});

productsRouter.put('/products/:id', async (req: Request, res: Response, next: NextFunction) => {
    await productsController.updateProduct(req, res, next);
});

productsRouter.delete('/products/:id', async (req: Request, res: Response, next: NextFunction) => {
    await productsController.deleteProduct(req, res, next);
});