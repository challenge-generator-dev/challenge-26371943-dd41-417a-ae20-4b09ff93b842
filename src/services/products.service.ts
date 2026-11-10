import { Product } from '../models/product.model';
import { ProductCreateDTO, ProductUpdateDTO, ProductDTO } from '../models/product.model';
import { IProductsRepository } from '../repositories/products.repository';
import { ValidationException } from '../exceptions/validation.exception';
import { NotFoundException } from '../exceptions/notFound.exception';
import { validateProductData, validateProductUpdateData } from '../validators/product.validator';

export class ProductsService {
    constructor(private readonly productsRepository: IProductsRepository) {}

    async getAllProducts(): Promise<ProductDTO[]> {
        const products = await this.productsRepository.getAll();
        return products.map(this.mapToDTO);
    }

    async getProductById(id: string): Promise<ProductDTO> {
        if (!id || id.trim() === '') {
            throw new ValidationException('El ID del producto es requerido');
        }

        const product = await this.productsRepository.getById(id);
        
        if (!product) {
            throw new NotFoundException(`Producto con ID ${id} no encontrado`);
        }

        return this.mapToDTO(product);
    }

    async createProduct(productData: ProductCreateDTO): Promise<ProductDTO> {
        const validationErrors = validateProductData(productData);
        
        if (validationErrors.length > 0) {
            throw new ValidationException('Error de validación al crear producto', validationErrors);
        }

        const nameExists = await this.productsRepository.existsByName(productData.name);
        if (nameExists) {
            throw new ValidationException('Ya existe un producto con el nombre proporcionado');
        }

        const createdProduct = await this.productsRepository.create(productData);
        return this.mapToDTO(createdProduct);
    }

    async updateProduct(id: string, productData: ProductUpdateDTO): Promise<ProductDTO> {
        if (!id || id.trim() === '') {
            throw new ValidationException('El ID del producto es requerido');
        }

        const existingProduct = await this.productsRepository.getById(id);
        if (!existingProduct) {
            throw new NotFoundException(`Producto con ID ${id} no encontrado`);
        }

        const validationErrors = validateProductUpdateData(productData);
        if (validationErrors.length > 0) {
            throw new ValidationException('Error de validación al actualizar producto', validationErrors);
        }

        if (productData.name && productData.name !== existingProduct.name) {
            const nameExists = await this.productsRepository.existsByName(productData.name);
            if (nameExists) {
                throw new ValidationException('Ya existe un producto con el nombre proporcionado');
            }
        }

        const updatedProduct = await this.productsRepository.update(id, productData);
        
        if (!updatedProduct) {
            throw new NotFoundException(`Producto con ID ${id} no encontrado`);
        }

        return this.mapToDTO(updatedProduct);
    }

    async deleteProduct(id: string): Promise<void> {
        if (!id || id.trim() === '') {
            throw new ValidationException('El ID del producto es requerido');
        }

        const existingProduct = await this.productsRepository.getById(id);
        if (!existingProduct) {
            throw new NotFoundException(`Producto con ID ${id} no encontrado`);
        }

        await this.productsRepository.delete(id);
    }

    private mapToDTO(product: Product): ProductDTO {
        return new ProductDTO(
            product.id,
            product.name,
            product.price,
            product.description
        );
    }
}