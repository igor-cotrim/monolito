import StoreCatalogFacade from "../facade/store-catalog.facade";
import ProductRepository from "../repositories/product.repository";
import FindAllProductsUseCase from "../usecases/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../usecases/find-product/find-product.usecase";

export default class StoreCatalogFacadeFactory {
  static create(): StoreCatalogFacade {
    const repository = new ProductRepository();
    const findProductUseCase = new FindProductUseCase(repository);
    const findAllProductsUseCase = new FindAllProductsUseCase(repository);
    const facade = new StoreCatalogFacade({
      findUseCase: findProductUseCase,
      findAllUseCase: findAllProductsUseCase,
    });

    return facade;
  }
}
