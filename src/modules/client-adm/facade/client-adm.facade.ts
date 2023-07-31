import IUseCase from "../../@shared/usecases/usecase.interface";
import IClientAdmFacade, {
  AddClientFacadeInputDto,
  FindClientFacadeInputDto,
  FindClientFacadeOutputDto,
} from "./client-adm.facade.interface";

export interface UseCaseProps {
  addUseCase: IUseCase;
  findUseCase: IUseCase;
}

export default class ClientAdmFacade implements IClientAdmFacade {
  private _findUseCase: IUseCase;
  private _addUseCase: IUseCase;

  constructor(props: UseCaseProps) {
    this._findUseCase = props.findUseCase;
    this._addUseCase = props.addUseCase;
  }

  async add(input: AddClientFacadeInputDto): Promise<void> {
    await this._addUseCase.execute(input);
  }

  async find(
    input: FindClientFacadeInputDto
  ): Promise<FindClientFacadeOutputDto> {
    return await this._findUseCase.execute(input);
  }
}
