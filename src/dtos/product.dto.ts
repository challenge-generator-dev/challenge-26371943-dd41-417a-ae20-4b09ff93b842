import { IsString, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class ProductDTO {
    id: string;
    name: string;
    price: number;
    description: string;

    constructor(id: string, name: string, price: number, description: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
    }
}

export class ProductCreateDTO {
    @IsString({ message: 'El nombre debe ser una cadena' })
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    name: string;

    @IsNumber({}, { message: 'El precio debe ser un número' })
    @Min(0, { message: 'El precio no puede ser negativo' })
    price: number;

    @IsString({ message: 'La descripción debe ser una cadena' })
    @IsOptional()
    description?: string;
}

export class ProductUpdateDTO {
    @IsString({ message: 'El nombre debe ser una cadena' })
    @IsOptional()
    name?: string;

    @IsNumber({}, { message: 'El precio debe ser un número' })
    @Min(0, { message: 'El precio no puede ser negativo' })
    @IsOptional()
    price?: number;

    @IsString({ message: 'La descripción debe ser una cadena' })
    @IsOptional()
    description?: string;
}