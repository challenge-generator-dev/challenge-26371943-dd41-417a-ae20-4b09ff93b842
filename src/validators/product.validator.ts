import { ProductCreateDTO, ProductUpdateDTO } from '../models/product.model';
import { validate, validateOrReject, IsString, IsNumber, Min, IsOptional, IsNotEmpty, Length } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export interface ValidationError {
    field: string;
    message: string;
}

class ProductCreateValidationClass {
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre es requerido' })
    @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres' })
    name!: string;

    @IsNumber({}, { message: 'El precio debe ser un número' })
    @Min(0, { message: 'El precio no puede ser negativo' })
    price!: number;

    @IsString({ message: 'La descripción debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La descripción es requerida' })
    @Length(10, 500, { message: 'La descripción debe tener entre 10 y 500 caracteres' })
    description!: string;
}

class ProductUpdateValidationClass {
    @IsOptional()
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres' })
    name?: string;

    @IsOptional()
    @IsNumber({}, { message: 'El precio debe ser un número' })
    @Min(0, { message: 'El precio no puede ser negativo' })
    price?: number;

    @IsOptional()
    @IsString({ message: 'La descripción debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
    @Length(10, 500, { message: 'La descripción debe tener entre 10 y 500 caracteres' })
    description?: string;
}

export async function validateProductData(productData: ProductCreateDTO): Promise<ValidationError[]> {
    const validationClass = plainToInstance(ProductCreateValidationClass, productData);
    const errors = await validate(validationClass);
    
    return errors.map(error => ({
        field: error.property,
        message: Object.values(error.constraints || {}).join(', ')
    }));
}

export async function validateProductUpdateData(productData: ProductUpdateDTO): Promise<ValidationError[]> {
    const validationClass = plainToInstance(ProductUpdateValidationClass, productData);
    const errors = await validate(validationClass);
    
    return errors.map(error => ({
        field: error.property,
        message: Object.values(error.constraints || {}).join(', ')
    }));
}

export function isValidProductName(name: string): boolean {
    if (!name || typeof name !== 'string') return false;
    const trimmedName = name.trim();
    return trimmedName.length >= 3 && trimmedName.length <= 100;
}

export function isValidPrice(price: number): boolean {
    return typeof price === 'number' && price >= 0 && !isNaN(price);
}

export function isValidDescription(description: string): boolean {
    if (!description || typeof description !== 'string') return false;
    const trimmedDescription = description.trim();
    return trimmedDescription.length >= 10 && trimmedDescription.length <= 500;
}

export function sanitizeProductInput(input: any): any {
    const sanitized: any = {};
    
    if (input.name !== undefined) {
        sanitized.name = typeof input.name === 'string' ? input.name.trim() : input.name;
    }
    
    if (input.price !== undefined) {
        sanitized.price = typeof input.price === 'number' ? input.price : parseFloat(input.price);
    }
    
    if (input.description !== undefined) {
        sanitized.description = typeof input.description === 'string' ? input.description.trim() : input.description;
    }
    
    return sanitized;
}