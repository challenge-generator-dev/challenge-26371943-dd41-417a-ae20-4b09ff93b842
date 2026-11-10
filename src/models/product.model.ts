import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class Product {
    id: string;

    @IsString()
    @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
    name: string;

    @IsNumber({}, { message: 'El precio debe ser un número' })
    @Min(0, { message: 'El precio no puede ser negativo' })
    price: number;

    @IsString()
    @IsNotEmpty({ message: 'La descripción del producto es obligatoria' })
    description: string;

    constructor(id: string, name: string, price: number, description: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
    }
}

export class ProductCreateDTO {
    @IsString()
    @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
    name: string;

    @IsNumber({}, { message: 'El precio debe ser un número' })
    @Min(0, { message: 'El precio no puede ser negativo' })
    price: number;

    @IsString()
    @IsNotEmpty({ message: 'La descripción del producto es obligatoria' })
    description: string;
}

export class ProductUpdateDTO {
    @IsString()
    @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
    name?: string;

    @IsNumber({}, { message: 'El precio debe ser un número' })
    @Min(0, { message: 'El precio no puede ser negativo' })
    price?: number;

    @IsString()
    @IsNotEmpty({ message: 'La descripción del producto es obligatoria' })
    description?: string;
}

export class ProductDTO {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly price: number,
        public readonly description: string
    ) {}
}