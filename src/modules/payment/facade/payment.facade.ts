import IUseCase from "../../@shared/usecases/usecase.interface";
import IPaymentFacade, {
  PaymentFacadeInputDto,
  PaymentFacadeOutputDto,
} from "./payment.facade.interface";

export default class PaymentFacade implements IPaymentFacade {
  constructor(private processPaymentUseCase: IUseCase) {}

  process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
    return this.processPaymentUseCase.execute(input);
  }
}
