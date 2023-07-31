import ClientAdmFacade from "../facade/client-adm.facade";
import ClientRepository from "../repositories/client.repository";
import AddClientUseCase from "../usecases/add-client/add-client.usecase";
import FindClientUseCase from "../usecases/find-client/find-client.usecase";

export default class ClientAdmFacadeFactory {
  static create() {
    const repository = new ClientRepository();
    const findClientUseCase = new FindClientUseCase(repository);
    const addClientUseCase = new AddClientUseCase(repository);
    const facade = new ClientAdmFacade({
      addUseCase: addClientUseCase,
      findUseCase: findClientUseCase,
    });

    return facade;
  }
}
