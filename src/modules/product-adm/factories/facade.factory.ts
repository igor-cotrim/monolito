import ProductAdmFacade from "../facade/product-adm.facade";
import ProductRepository from "../repositories/product.repository";
import AddProductUsecase from "../usecases/add-product/add-product.usecase";
import CheckStockUseCase from "../usecases/check-stock/check-stock.usecase";

export default class ProductAdmFacadeFactory {
  static create() {
    const repository = new ProductRepository();
    const addProductUsecase = new AddProductUsecase(repository);
    const checkStockUsecase = new CheckStockUseCase(repository);
    const facade = new ProductAdmFacade({
      addUsecase: addProductUsecase,
      stockUsecase: checkStockUsecase,
    });

    return facade;
  }
}
