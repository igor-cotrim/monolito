import { AddProductInputDto } from "./add-product.dto";
import AddProductUsecase from "./add-product.usecase";

const MockRepository = () => ({
  add: jest.fn(),
  find: jest.fn(),
});

describe("#add_product_usecase_unit_test", () => {
  it("should add a product", async () => {
    const repository = MockRepository();
    const usecase = new AddProductUsecase(repository);
    const input: AddProductInputDto = {
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 10,
      stock: 10,
    };
    const result = await usecase.execute(input);

    expect(repository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.description).toBe(input.description);
    expect(result.purchasePrice).toBe(input.purchasePrice);
    expect(result.stock).toBe(input.stock);
  });
});
