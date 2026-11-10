# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Boilerplate del stack que falta

Sin esto no compila ni arranca. Es andamiaje, no toca nada de lo pedagogico:

- **src/app.module.ts** — Sin el modulo raiz, Nest no tiene arbol de dependencias que resolver y el bootstrap falla.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/repositories/products.repository.ts` — `Product.find`: Se invoca `find` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/repositories/products.repository.ts` — `Product.push`: Se invoca `push` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/repositories/products.repository.ts` — `Product.findIndex`: Se invoca `findIndex` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/repositories/products.repository.ts` — `Product.filter`: Se invoca `filter` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/repositories/products.repository.ts` — `Product.some`: Se invoca `some` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/controllers/products.controller.ts` — `ProductsService.existsById`: Se invoca `existsById` sobre `ProductsService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/tests/products.service.spec.ts` — `ProductsService.existsByName`: Se invoca `existsByName` sobre `ProductsService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2

### Brecha de conocimiento
Construir endpoints REST con validacion y manejo de errores (corrida e2e 20261109191022203), Expone endpoints REST con validacion de entrada y manejo centralizado de errores

### Misión / candidato
Exponer el catalogo de productos

### Reto
- Tema: Construccion de APIs REST con Express
- Seniority: advanced-l2
- Tipo: practical
- Título: Exposición de catálogo de productos a través de API REST
- Tiempo estimado: 4 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Definición de endpoints y validación básica — objetivo: Definir los endpoints REST necesarios y aplicar validación básica a los datos de entrada. — entregable (NO resolver): Documentación de los endpoints definidos y ejemplos de solicitudes válidas e inválidas.
- Fase 2: Manejo centralizado de errores — objetivo: Implementar un manejo centralizado de errores para los endpoints definidos. — entregable (NO resolver): Código que implementa el manejo centralizado de errores y documentación de los errores posibles y sus respuestas.
- Fase 3: Pruebas y optimización — objetivo: Realizar pruebas de los endpoints y optimizar el código si es necesario. — entregable (NO resolver): Reporte de pruebas y código optimizado si es necesario.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "product-catalog-api",
  "version": "1.0.0",
  "description": "API REST para gestión de catálogo de productos",
  "main": "dist/main.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/main.js",
    "dev": "ts-node src/main.ts",
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.21.0",
    "typescript": "^5.7.2",
    "@types/express": "^4.17.21",
    "class-validator": "^0.14.1",
    "class-transformer": "^0.5.1",
    "reflect-metadata": "^0.2.2"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "@types/jest": "^29.5.12",
    "supertest": "^7.0.0",
    "@types/supertest": "^6.0.2",
    "ts-jest": "^29.2.5",
    "ts-node": "^10.9.2"
  }
}

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}

// === ARCHIVO: src/main.ts ===
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

// === ARCHIVO: src/models/product.model.ts ===
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

// === ARCHIVO: src/repositories/products.repository.ts ===
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

// === ARCHIVO: src/index.ts ===
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

// === ARCHIVO: src/routes/products.ts ===
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

// === ARCHIVO: src/controllers/products.controller.ts ===
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

// === ARCHIVO: src/services/products.service.ts ===
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

// === ARCHIVO: src/validators/product.validator.ts ===
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

// === ARCHIVO: src/middlewares/errorHandler.ts ===
import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/http.exception';
import { ValidationException } from '../exceptions/validation.exception';
import { NotFoundException } from '../exceptions/notFound.exception';

export interface ErrorResponse {
    success: boolean;
    statusCode: number;
    message: string;
    timestamp: string;
    path?: string;
    errors?: Array<{ field: string; message: string }>;
}

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    console.error(`[Error] ${err.constructor.name}: ${err.message}`);
    console.error(`[Error Stack] ${err.stack}`);

    let statusCode: number = 500;
    let message: string = 'Error interno del servidor';
    let errors: Array<{ field: string; message: string }> | undefined;

    if (err instanceof HttpException) {
        statusCode = err.statusCode;
        message = err.message;

        if (err instanceof ValidationException && err.errors) {
            errors = err.errors;
        }
    } else if (err instanceof NotFoundException) {
        statusCode = 404;
        message = err.message;
    } else if (err instanceof ValidationException) {
        statusCode = 400;
        message = err.message;
        if (err.errors) {
            errors = err.errors;
        }
    } else if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Error de validación de datos';
        errors = extractValidationErrors(err);
    } else if (err.name === 'CastError') {
        statusCode = 400;
        message = 'ID de formato inválido';
    } else if (err.code === 'ENOENT') {
        statusCode = 404;
        message = 'Recurso no encontrado';
    } else if (err.code === 'PERMISSION_DENIED') {
        statusCode = 403;
        message = 'Permiso denegado';
    }

    const response: ErrorResponse = {
        success: false,
        statusCode,
        message,
        timestamp: new Date().toISOString(),
        path: req.path
    };

    if (errors && errors.length > 0) {
        response.errors = errors;
    }

    res.status(statusCode).json(response);
}

function extractValidationErrors(err: any): Array<{ field: string; message: string }> {
    const errors: Array<{ field: string; message: string }> = [];

    if (err.errors) {
        for (const key in err.errors) {
            const error = err.errors[key];
            errors.push({
                field: key,
                message: error.message || 'Validation error'
            });
        }
    }

    return errors;
}

export function notFoundHandler(req: Request, res: Response): void {
    const response: ErrorResponse = {
        success: false,
        statusCode: 404,
        message: `Ruta ${req.method} ${req.path} no encontrada`,
        timestamp: new Date().toISOString(),
        path: req.path
    };

    res.status(404).json(response);
}

export function asyncHandler(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

// === ARCHIVO: src/exceptions/http.exception.ts ===
export class HttpException extends Error {
    public readonly statusCode: number;
    public readonly errorCode?: string;
    public readonly timestamp: string;
    public readonly path?: string;

    constructor(
        message: string,
        statusCode: number,
        errorCode?: string,
        details?: unknown
    ) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.timestamp = new Date().toISOString();
        
        if (details !== undefined) {
            this["details"] = details;
        }

        Error.captureStackTrace(this, this.constructor);
    }

    public toJSON(): Record<string, unknown> {
        const response: Record<string, unknown> = {
            error: this.message,
            statusCode: this.statusCode,
            timestamp: this.timestamp
        };

        if (this.errorCode) {
            response.errorCode = this.errorCode;
        }

        if (this.path) {
            response.path = this.path;
        }

        if (this["details"] !== undefined) {
            response.details = this["details"];
        }

        return response;
    }

    public static isHttpException(error: unknown): error is HttpException {
        return error instanceof HttpException;
    }

    protected static formatMessage(defaultMessage: string, customMessage?: string): string {
        return customMessage || defaultMessage;
    }

    protected static getDefaultStatusCode(): number {
        return 500;
    }
}

// === ARCHIVO: src/exceptions/validation.exception.ts ===
import { HttpException } from "./http.exception";
import { ValidationError } from "class-validator";

export class ValidationException extends HttpException {
    public readonly validationErrors: ValidationError[];
    public readonly formattedErrors: Record<string, string[]>;

    constructor(
        validationErrors: ValidationError[],
        message: string = "Error de validación en los datos proporcionados"
    ) {
        const formatted = ValidationException.formatValidationErrors(validationErrors);
        super(message, 422, "VALIDATION_ERROR", formatted);
        
        this.validationErrors = validationErrors;
        this.formattedErrors = formatted;
    }

    private static formatValidationErrors(errors: ValidationError[]): Record<string, string[]> {
        const formatted: Record<string, string[]> = {};

        for (const error of errors) {
            const property = error.property;
            const constraints = error.constraints;
            
            if (!formatted[property]) {
                formatted[property] = [];
            }

            if (constraints) {
                const messages = Object.values(constraints);
                formatted[property].push(...messages);
            }

            if (error.children && error.children.length > 0) {
                const childErrors = ValidationException.formatValidationErrors(error.children);
                for (const [childProperty, childMessages] of Object.entries(childErrors)) {
                    const fullProperty = `${property}.${childProperty}`;
                    if (!formatted[fullProperty]) {
                        formatted[fullProperty] = [];
                    }
                    formatted[fullProperty].push(...childMessages);
                }
            }
        }

        return formatted;
    }

    public getFirstErrorForProperty(property: string): string | undefined {
        const errors = this.formattedErrors[property];
        return errors && errors.length > 0 ? errors[0] : undefined;
    }

    public hasErrorForProperty(property: string): boolean {
        return !!this.formattedErrors[property] && this.formattedErrors[property].length > 0;
    }

    public getAllErrors(): Array<{ property: string; messages: string[] }> {
        return Object.entries(this.formattedErrors).map(([property, messages]) => ({
            property,
            messages
        }));
    }

    public getErrorCount(): number {
        let count = 0;
        for (const messages of Object.values(this.formattedErrors)) {
            count += messages.length;
        }
        return count;
    }

    public toJSON(): Record<string, unknown> {
        return {
            error: this.message,
            statusCode: this.statusCode,
            errorCode: this.errorCode,
            timestamp: this.timestamp,
            validationErrors: this.formattedErrors,
            totalErrors: this.getErrorCount()
        };
    }
}

// === ARCHIVO: src/exceptions/notFound.exception.ts ===
import { HttpException } from "./http.exception";

export class NotFoundException extends HttpException {
    public readonly resourceType: string;
    public readonly resourceIdentifier: string | number;

    constructor(
        resourceType: string,
        resourceIdentifier: string | number,
        message?: string
    ) {
        const defaultMessage = message || `${resourceType} con identificador '${resourceIdentifier}' no encontrado`;
        super(defaultMessage, 404, "NOT_FOUND");
        
        this.resourceType = resourceType;
        this.resourceIdentifier = resourceIdentifier;
    }

    public static forProduct(id: string): NotFoundException {
        return new NotFoundException("Producto", id);
    }

    public static forResource(resourceType: string, identifier: string | number): NotFoundException {
        return new NotFoundException(resourceType, identifier);
    }

    public toJSON(): Record<string, unknown> {
        return {
            error: this.message,
            statusCode: this.statusCode,
            errorCode: this.errorCode,
            timestamp: this.timestamp,
            resource: {
                type: this.resourceType,
                identifier: this.resourceIdentifier
            }
        };
    }

    public static isNotFoundException(error: unknown): error is NotFoundException {
        return error instanceof NotFoundException;
    }
}

// === ARCHIVO: src/utils/response.util.ts ===
import { Response } from 'express';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
}

export const successResponse = <T>(
  res: Response,
  data: T,
  message: string = 'Operación exitosa',
  statusCode: number = 200
): Response<ApiResponse<T>> => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message,
    timestamp: new Date().toISOString()
  };
  return res.status(statusCode).json(response);
};

export const errorResponse = (
  res: Response,
  message: string,
  statusCode: number = 500,
  error?: string
): Response<ApiResponse> => {
  const response: ApiResponse = {
    success: false,
    message,
    error: error || message,
    timestamp: new Date().toISOString()
  };
  return res.status(statusCode).json(response);
};

export const createdResponse = <T>(
  res: Response,
  data: T,
  message: string = 'Recurso creado correctamente'
): Response<ApiResponse<T>> => {
  return successResponse(res, data, message, 201);
};

export const noContentResponse = (res: Response): Response => {
  return res.status(204).send();
};

export const badRequestResponse = (
  res: Response,
  message: string = 'Solicitud inválida',
  error?: string
): Response<ApiResponse> => {
  return errorResponse(res, message, 400, error);
};

export const notFoundResponse = (
  res: Response,
  message: string = 'Recurso no encontrado'
): Response<ApiResponse> => {
  return errorResponse(res, message, 404);
};

export const internalServerErrorResponse = (
  res: Response,
  message: string = 'Error interno del servidor'
): Response<ApiResponse> => {
  return errorResponse(res, message, 500);
};

// === ARCHIVO: src/tests/products.controller.spec.ts ===
import request from 'supertest';
import { Express } from 'express';
import { ProductsController } from '../controllers/products.controller';
import { ProductsService } from '../services/products.service';
import { ProductDTO, ProductCreateDTO, ProductUpdateDTO } from '../models/product.model';

describe('ProductsController', () => {
  let controller: ProductsController;
  let mockService: jest.Mocked<ProductsService>;
  let app: Express;

  const mockProduct: ProductDTO = {
    id: '1',
    name: 'Producto de prueba',
    price: 99.99,
    description: 'Descripción del producto'
  };

  const mockProductList: ProductDTO[] = [
    mockProduct,
    { id: '2', name: 'Otro producto', price: 149.99, description: 'Otra descripción' }
  ];

  beforeEach(() => {
    mockService = {
      getAllProducts: jest.fn(),
      getProductById: jest.fn(),
      createProduct: jest.fn(),
      updateProduct: jest.fn(),
      deleteProduct: jest.fn()
    } as jest.Mocked<ProductsService>;

    controller = new ProductsController(mockService);
  });

  describe('GET /api/products', () => {
    it('debe retornar todos los productos', async () => {
      mockService.getAllProducts.mockResolvedValue(mockProductList);

      const result = await controller.getAllProducts({} as any);

      expect(mockService.getAllProducts).toHaveBeenCalled();
      expect(result.status).toBe(200);
    });

    it('debe manejar errores al obtener productos', async () => {
      mockService.getAllProducts.mockRejectedValue(new Error('Error de base de datos'));

      const result = await controller.getAllProducts({} as any);

      expect(result.status).toBe(500);
    });

    it('debe retornar array vacío cuando no hay productos', async () => {
      mockService.getAllProducts.mockResolvedValue([]);

      const result = await controller.getAllProducts({} as any);

      expect(result.status).toBe(200);
      expect(result.json).toHaveProperty('data');
    });
  });

  describe('GET /api/products/:id', () => {
    it('debe retornar un producto por id', async () => {
      mockService.getProductById.mockResolvedValue(mockProduct);

      const result = await controller.getProductById({ params: { id: '1' } } as any);

      expect(mockService.getProductById).toHaveBeenCalledWith('1');
      expect(result.status).toBe(200);
    });

    it('debe retornar 404 cuando el producto no existe', async () => {
      mockService.getProductById.mockResolvedValue(null);

      const result = await controller.getProductById({ params: { id: '999' } } as any);

      expect(result.status).toBe(404);
    });

    it('debe manejar errores de validación de id', async () => {
      mockService.getProductById.mockRejectedValue(new Error('ID inválido'));

      const result = await controller.getProductById({ params: { id: 'invalid' } } as any);

      expect(result.status).toBe(500);
    });
  });

  describe('POST /api/products', () => {
    const createDto: ProductCreateDTO = {
      name: 'Nuevo producto',
      price: 199.99,
      description: 'Nueva descripción'
    };

    it('debe crear un producto exitosamente', async () => {
      mockService.createProduct.mockResolvedValue({ ...mockProduct, ...createDto });

      const result = await controller.createProduct({ body: createDto } as any);

      expect(mockService.createProduct).toHaveBeenCalledWith(createDto);
      expect(result.status).toBe(201);
    });

    it('debe manejar errores de validación', async () => {
      const invalidDto = { name: '', price: -10 } as any;

      const result = await controller.createProduct({ body: invalidDto } as any);

      expect(result.status).toBe(400);
    });

    it('debe manejar error de nombre duplicado', async () => {
      mockService.createProduct.mockRejectedValue(new Error('El nombre del producto ya existe'));

      const result = await controller.createProduct({ body: createDto } as any);

      expect(result.status).toBe(409);
    });
  });

  describe('PUT /api/products/:id', () => {
    const updateDto: ProductUpdateDTO = {
      name: 'Producto actualizado',
      price: 299.99
    };

    it('debe actualizar un producto exitosamente', async () => {
      mockService.updateProduct.mockResolvedValue({ ...mockProduct, ...updateDto });

      const result = await controller.updateProduct(
        { params: { id: '1' }, body: updateDto } as any
      );

      expect(mockService.updateProduct).toHaveBeenCalledWith('1', updateDto);
      expect(result.status).toBe(200);
    });

    it('debe retornar 404 cuando el producto no existe', async () => {
      mockService.updateProduct.mockResolvedValue(null);

      const result = await controller.updateProduct(
        { params: { id: '999' }, body: updateDto } as any
      );

      expect(result.status).toBe(404);
    });

    it('debe manejar error de nombre duplicado en actualización', async () => {
      mockService.updateProduct.mockRejectedValue(new Error('El nombre del producto ya existe'));

      const result = await controller.updateProduct(
        { params: { id: '1' }, body: updateDto } as any
      );

      expect(result.status).toBe(409);
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('debe eliminar un producto exitosamente', async () => {
      mockService.deleteProduct.mockResolvedValue();

      const result = await controller.deleteProduct({ params: { id: '1' } } as any);

      expect(mockService.deleteProduct).toHaveBeenCalledWith('1');
      expect(result.status).toBe(204);
    });

    it('debe manejar error al eliminar producto inexistente', async () => {
      mockService.deleteProduct.mockRejectedValue(new Error('Producto no encontrado'));

      const result = await controller.deleteProduct({ params: { id: '999' } } as any);

      expect(result.status).toBe(500);
    });
  });
});

// === ARCHIVO: src/tests/products.service.spec.ts ===
import { ProductsService } from '../services/products.service';
import { IProductsRepository } from '../repositories/products.repository';
import { Product, ProductCreateDTO, ProductUpdateDTO } from '../models/product.model';

describe('ProductsService', () => {
  let service: ProductsService;
  let mockRepository: jest.Mocked<IProductsRepository>;

  const mockProduct: Product = new Product(
    '1',
    'Producto de prueba',
    99.99,
    'Descripción del producto'
  );

  beforeEach(() => {
    mockRepository = {
      getAll: jest.fn(),
      getById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      existsByName: jest.fn()
    };

    service = new ProductsService(mockRepository);
  });

  describe('getAllProducts', () => {
    it('debe retornar todos los productos del repositorio', async () => {
      const products = [mockProduct];
      mockRepository.getAll.mockResolvedValue(products);

      const result = await service.getAllProducts();

      expect(mockRepository.getAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(products);
    });

    it('debe retornar array vacío cuando no hay productos', async () => {
      mockRepository.getAll.mockResolvedValue([]);

      const result = await service.getAllProducts();

      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });

    it('debe propagar errores del repositorio', async () => {
      mockRepository.getAll.mockRejectedValue(new Error('Error de base de datos'));

      await expect(service.getAllProducts()).rejects.toThrow('Error de base de datos');
    });
  });

  describe('getProductById', () => {
    it('debe retornar un producto por id', async () => {
      mockRepository.getById.mockResolvedValue(mockProduct);

      const result = await service.getProductById('1');

      expect(mockRepository.getById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockProduct);
    });

    it('debe retornar null cuando el producto no existe', async () => {
      mockRepository.getById.mockResolvedValue(null);

      const result = await service.getProductById('999');

      expect(result).toBeNull();
    });

    it('debe manejar errores de validación de id', async () => {
      await expect(service.getProductById('')).rejects.toThrow();
    });
  });

  describe('createProduct', () => {
    const createDto: ProductCreateDTO = {
      name: 'Nuevo producto',
      price: 199.99,
      description: 'Nueva descripción'
    };

    it('debe crear un producto exitosamente', async () => {
      mockRepository.existsByName.mockResolvedValue(false);
      mockRepository.create.mockResolvedValue(new Product(
        '2',
        createDto.name,
        createDto.price,
        createDto.description
      ));

      const result = await service.createProduct(createDto);

      expect(mockRepository.existsByName).toHaveBeenCalledWith(createDto.name);
      expect(mockRepository.create).toHaveBeenCalledWith(createDto);
      expect(result.name).toBe(createDto.name);
    });

    it('debe lanzar error si el nombre ya existe', async () => {
      mockRepository.existsByName.mockResolvedValue(true);

      await expect(service.createProduct(createDto)).rejects.toThrow(
        'El nombre del producto ya existe'
      );
      expect(mockRepository.create).not.toHaveBeenCalled();
    });

    it('debe lanzar error si el precio es negativo', async () => {
      const invalidDto = { ...createDto, price: -50 };

      await expect(service.createProduct(invalidDto)).rejects.toThrow();
    });

    it('debe lanzar error si el nombre está vacío', async () => {
      const invalidDto = { ...createDto, name: '' };

      await expect(service.createProduct(invalidDto)).rejects.toThrow();
    });
  });

  describe('updateProduct', () => {
    const updateDto: ProductUpdateDTO = {
      name: 'Producto actualizado',
      price: 299.99
    };

    it('debe actualizar un producto exitosamente', async () => {
      mockRepository.getById.mockResolvedValue(mockProduct);
      mockRepository.existsByName.mockResolvedValue(false);
      mockRepository.update.mockResolvedValue({ ...mockProduct, ...updateDto });

      const result = await service.updateProduct('1', updateDto);

      expect(mockRepository.update).toHaveBeenCalledWith('1', updateDto);
      expect(result).toBeDefined();
    });

    it('debe retornar null si el producto no existe', async () => {
      mockRepository.getById.mockResolvedValue(null);

      const result = await service.updateProduct('999', updateDto);

      expect(result).toBeNull();
      expect(mockRepository.update).not.toHaveBeenCalled();
    });

    it('debe lanzar error si el nombre ya existe en otro producto', async () => {
      const otherProduct = new Product('2', 'Otro producto', 100, 'desc');
      mockRepository.getById.mockResolvedValue(mockProduct);
      mockRepository.existsByName.mockResolvedValue(true);

      await expect(service.updateProduct('1', updateDto)).rejects.toThrow(
        'El nombre del producto ya existe'
      );
    });
  });

  describe('deleteProduct', () => {
    it('debe eliminar un producto exitosamente', async () => {
      mockRepository.getById.mockResolvedValue(mockProduct);
      mockRepository.delete.mockResolvedValue();

      await service.deleteProduct('1');

      expect(mockRepository.delete).toHaveBeenCalledWith('1');
    });

    it('debe lanzar error si el producto no existe', async () => {
      mockRepository.getById.mockResolvedValue(null);

      await expect(service.deleteProduct('999')).rejects.toThrow(
        'Producto no encontrado'
      );
    });

    it('debe propagar errores del repositorio', async () => {
      mockRepository.getById.mockResolvedValue(mockProduct);
      mockRepository.delete.mockRejectedValue(new Error('Error de eliminación'));

      await expect(service.deleteProduct('1')).rejects.toThrow('Error de eliminación');
    });
  });

  describe('existsByName', () => {
    it('debe retornar true si el nombre existe', async () => {
      mockRepository.existsByName.mockResolvedValue(true);

      const result = await service.existsByName('Producto de prueba');

      expect(result).toBe(true);
    });

    it('debe retornar false si el nombre no existe', async () => {
      mockRepository.existsByName.mockResolvedValue(false);

      const result = await service.existsByName('Producto inexistente');

      expect(result).toBe(false);
    });
  });
});

// === ARCHIVO: src/dtos/product.dto.ts ===
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
```
