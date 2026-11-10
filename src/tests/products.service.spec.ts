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