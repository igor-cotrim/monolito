import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import CheckStockUseCase from "./check-stock.usecase";

const product = new Product({
  id: new Id("1"),
  name: "Product 1",
  description: "Product 1 description",
  purchasePrice: 10,
  stock: 10,
});

const MockRepository = () => ({
  add: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
});

describe("#check_stock_usecase_unit_test", () => {
  it("should get stock oif a product", async () => {
    const repository = MockRepository();
    const usecase = new CheckStockUseCase(repository);
    const input = { productId: "1" };
    const result = await usecase.execute(input);

    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual({ productId: "1", stock: 10 });
  });
});
