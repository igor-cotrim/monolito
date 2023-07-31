import IUseCase from "../../../@shared/usecases/usecase.interface";
import ProductGateway from "../../gateway/product.gateway";

export default class FindAllProductsUseCase implements IUseCase {
  constructor(private repository: ProductGateway) {}

  async execute(): Promise<any> {
    const products = await this.repository.findAll();

    return {
      products: products.map((product) => ({
        id: product.id.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
      })),
    };
  }
}
