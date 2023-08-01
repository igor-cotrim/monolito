import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUseCase from "./process-payment.usecase";

const approvedTransaction = new Transaction({
  id: new Id("1"),
  amount: 100,
  orderId: "1",
  status: "approved",
});

const approvedMockRepository = () => ({
  save: jest.fn().mockResolvedValue(Promise.resolve(approvedTransaction)),
});

const declinedTransaction = new Transaction({
  id: new Id("1"),
  amount: 50,
  orderId: "1",
  status: "declined",
});

const declinedMockRepository = () => ({
  save: jest.fn().mockResolvedValue(Promise.resolve(declinedTransaction)),
});

describe("#process_payment_usecase_unit_test", () => {
  it("should approve a transaction", async () => {
    const repository = approvedMockRepository();
    const usecase = new ProcessPaymentUseCase(repository);
    const input = {
      orderId: "1",
      amount: 100,
    };
    const result = await usecase.execute(input);

    expect(result.transactionId).toBe(approvedTransaction.id.id);
    expect(repository.save).toHaveBeenCalled();
    expect(result.status).toBe("approved");
    expect(result.amount).toBe(100);
    expect(result.orderId).toBe("1");
    expect(result.createdAt).toBe(approvedTransaction.createdAt);
    expect(result.updatedAt).toBe(approvedTransaction.updatedAt);
  });

  it("should decline a transaction", async () => {
    const repository = declinedMockRepository();
    const usecase = new ProcessPaymentUseCase(repository);
    const input = {
      orderId: "1",
      amount: 50,
    };
    const result = await usecase.execute(input);

    expect(result.transactionId).toBe(declinedTransaction.id.id);
    expect(repository.save).toHaveBeenCalled();
    expect(result.status).toBe("declined");
    expect(result.amount).toBe(50);
    expect(result.orderId).toBe("1");
    expect(result.createdAt).toBe(declinedTransaction.createdAt);
    expect(result.updatedAt).toBe(declinedTransaction.updatedAt);
  });
});
