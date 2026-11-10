import { Product, ProductCreateDTO, ProductUpdateDTO } from '../models/product.model';

export interface IProductsRepository {
    getAll(): Promise<Product[]>;
    getById(id: string): Promise<Product | null>;
    create(productData: ProductCreateDTO): Promise<Product>;
    update(id: string, productData: ProductUpdateDTO): Promise<Product | null>;
    delete(id: string): Promise<void>;
    existsByName(name: string): Promise<boolean>;
}

export class ProductsRepository implements IProductsRepository {
    private products: Product[] = [];
    private nextId = 1;

    async getAll(): Promise<Product[]> {
        return [...this.products];
    }

    async getById(id: string): Promise<Product | null> {
        return this.products.find(product => product.id === id) || null;
    }

    async create(productData: ProductCreateDTO): Promise<Product> {
        const existingProduct = await this.existsByName(productData.name);
        if (existingProduct) {
            throw new Error('Ya existe un producto con ese nombre');
        }

        const newProduct = new Product(
            this.nextId.toString(),
            productData.name,
            productData.price,
            productData.description
        );
        this.products.push(newProduct);
        this.nextId++;
        return newProduct;
    }

    async update(id: string, productData: ProductUpdateDTO): Promise<Product | null> {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            return null;
        }

        if (productData.name) {
            const existingProduct = await this.existsByName(productData.name);
            if (existingProduct && this.products[productIndex].name !== productData.name) {
                throw new Error('Ya existe un producto con ese nombre');
            }
        }

        const updatedProduct = {
            ...this.products[productIndex],
            ...productData,
            id
        };

        this.products[productIndex] = updatedProduct;
        return updatedProduct;
    }

    async delete(id: string): Promise<void> {
        this.products = this.products.filter(product => product.id !== id);
    }

    async existsByName(name: string): Promise<boolean> {
        return this.products.some(product => product.name === name);
    }
}