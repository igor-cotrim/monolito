import { Sequelize } from "sequelize-typescript";

import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import { ProductModel } from "./product.model";
import ProductRepository from "./product.repository";

describe("#product_repository_test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const props = {
      id: new Id("1"),
      name: "Product 1",
      description: "Product description 1",
      purchasePrice: 10,
      stock: 10,
    };
    const repository = new ProductRepository();
    const product = new Product(props);

    await repository.add(product);

    const productDb = await ProductModel.findOne({
      where: { id: props.id.id },
    });

    expect(productDb).not.toBeNull();
    expect(productDb.id).toBe(props.id.id);
    expect(productDb.name).toBe(props.name);
    expect(productDb.description).toBe(props.description);
    expect(productDb.purchasePrice).toBe(props.purchasePrice);
    expect(productDb.stock).toBe(props.stock);
  });

  it("should find a product", async () => {
    const repository = new ProductRepository();

    ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Product description 1",
      purchasePrice: 10,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const product = await repository.find("1");

    expect(product).not.toBeNull();
    expect(product.id.id).toBe("1");
    expect(product.name).toBe("Product 1");
    expect(product.description).toBe("Product description 1");
    expect(product.purchasePrice).toBe(10);
    expect(product.stock).toBe(10);
  });
});
