import PaymentFacade from "../facade/payment.facade";
import IPaymentFacade from "../facade/payment.facade.interface";
import TransactionRepostiory from "../repositories/transaction.repository";
import ProcessPaymentUseCase from "../usecases/process-payment/process-payment.usecase";

export default class PaymentFacadeFactory {
  static create(): IPaymentFacade {
    const repository = new TransactionRepostiory();
    const usecase = new ProcessPaymentUseCase(repository);
    const facade = new PaymentFacade(usecase);

    return facade;
  }
}
