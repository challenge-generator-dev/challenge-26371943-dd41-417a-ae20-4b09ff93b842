import { Request, Response, NextFunction } from 'express';
import { ProductsService } from '../services/products.service';
import { ProductCreateDTO, ProductUpdateDTO, ProductDTO } from '../models/product.model';
import { ValidationException } from '../exceptions/validation.exception';
import { NotFoundException } from '../exceptions/notFound.exception';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class ProductsController {
    private productsService: ProductsService;
    
    constructor() {
        this.productsService = new ProductsService();
    }
    
    async getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const products = await this.productsService.getAllProducts();
            const productsDTO: ProductDTO[] = products.map(product => new ProductDTO(
                product.id,
                product.name,
                product.price,
                product.description
            ));
            res.status(200).json(productsDTO);
        } catch (error) {
            next(error);
        }
    }
    
    async getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            if (!id) {
                throw new ValidationException('El ID del producto es requerido');
            }
            
            const product = await this.productsService.getProductById(id);
            
            if (!product) {
                throw new NotFoundException(`Producto con ID ${id} no encontrado`);
            }
            
            const productDTO = new ProductDTO(
                product.id,
                product.name,
                product.price,
                product.description
            );
            res.status(200).json(productDTO);
        } catch (error) {
            next(error);
        }
    }
    
    async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const productData = plainToInstance(ProductCreateDTO, req.body);
            const errors = await validate(productData);
            
            if (errors.length > 0) {
                const validationErrors = errors.map(err => ({
                    property: err.property,
                    constraints: err.constraints
                }));
                throw new ValidationException('Error de validación', validationErrors);
            }
            
            const product = await this.productsService.createProduct(productData as ProductCreateDTO);
            const productDTO = new ProductDTO(
                product.id,
                product.name,
                product.price,
                product.description
            );
            res.status(201).json(productDTO);
        } catch (error) {
            next(error);
        }
    }
    
    async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            if (!id) {
                throw new ValidationException('El ID del producto es requerido');
            }
            
            const productData = plainToInstance(ProductUpdateDTO, req.body);
            const errors = await validate(productData);
            
            if (errors.length > 0) {
                const validationErrors = errors.map(err => ({
                    property: err.property,
                    constraints: err.constraints
                }));
                throw new ValidationException('Error de validación', validationErrors);
            }
            
            const product = await this.productsService.updateProduct(id, productData as ProductUpdateDTO);
            
            if (!product) {
                throw new NotFoundException(`Producto con ID ${id} no encontrado`);
            }
            
            const productDTO = new ProductDTO(
                product.id,
                product.name,
                product.price,
                product.description
            );
            res.status(200).json(productDTO);
        } catch (error) {
            next(error);
        }
    }
    
    async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            if (!id) {
                throw new ValidationException('El ID del producto es requerido');
            }
            
            const exists = await this.productsService.existsById(id);
            if (!exists) {
                throw new NotFoundException(`Producto con ID ${id} no encontrado`);
            }
            
            await this.productsService.deleteProduct(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}