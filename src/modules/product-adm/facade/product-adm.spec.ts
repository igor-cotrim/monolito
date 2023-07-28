import { Sequelize } from "sequelize-typescript";

import { ProductModel } from "../repositories/product.model";
import ProductAdmFacadeFactory from "../factories/facade.factory";

describe("#product_adm_facade_test", () => {
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
    const facade = ProductAdmFacadeFactory.create();
    const input = {
      id: "1",
      name: "product 1",
      description: "product 1 description",
      purchasePrice: 10,
      stock: 10,
    };

    await facade.addProduct(input);

    const product = await ProductModel.findOne({ where: { id: "1" } });

    expect(product).not.toBeNull();
    expect(product.id).toBe(input.id);
    expect(product.name).toBe(input.name);
    expect(product.description).toBe(input.description);
    expect(product.purchasePrice).toBe(input.purchasePrice);
    expect(product.stock).toBe(input.stock);
  });
});
