import ProductAdmFacade from "../facade/product-adm.facade";
import ProductRepository from "../repositories/product.repository";
import AddProductUsecase from "../usecases/add-product/add-product.usecase";

export default class ProductAdmFacadeFactory {
  static create() {
    const repository = new ProductRepository();
    const usecase = new AddProductUsecase(repository);
    const facade = new ProductAdmFacade({
      addUsecase: usecase,
      stockUsecase: null,
    });

    return facade;
  }
}
