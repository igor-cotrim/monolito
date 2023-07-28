import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { AddProductInputDto, AddProductOutputDto } from "./add-product.dto";

export default class AddProductUsecase {
  private _repository: ProductGateway;

  constructor(repository: ProductGateway) {
    this._repository = repository;
  }

  async execute({
    id,
    name,
    description,
    purchasePrice,
    stock,
  }: AddProductInputDto): Promise<AddProductOutputDto> {
    const props = {
      id: new Id(id),
      name,
      description,
      purchasePrice,
      stock,
    };
    const product = new Product(props);

    this._repository.add(product);

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
