import IUseCase from "../../@shared/usecases/usecase.interface";
import IProductAdmFacade, {
  addProductFacadeInputDto,
  checkStockFacadeInputDto,
  checkStockFacadeOutputDto,
} from "./product-adm.facade.interface";

export interface UsecasesProps {
  addUsecase: IUseCase;
  stockUsecase: IUseCase;
}

export default class ProductAdmFacade implements IProductAdmFacade {
  private _addUsecase: IUseCase;
  private _checkStockUsecase: IUseCase;

  constructor(props: UsecasesProps) {
    this._addUsecase = props.addUsecase;
    this._checkStockUsecase = props.stockUsecase;
  }

  addProduct(input: addProductFacadeInputDto): Promise<void> {
    return this._addUsecase.execute(input);
  }

  checkStock(
    input: checkStockFacadeInputDto
  ): Promise<checkStockFacadeOutputDto> {
    return this._checkStockUsecase.execute(input);
  }
}
