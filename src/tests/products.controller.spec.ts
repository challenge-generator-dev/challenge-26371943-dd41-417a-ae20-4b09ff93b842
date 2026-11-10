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