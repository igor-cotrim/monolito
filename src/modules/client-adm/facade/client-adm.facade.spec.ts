import { Sequelize } from "sequelize-typescript";

import AddClientUseCase from "../usecases/add-client/add-client.usecase";
import ClientModel from "../repositories/client.model";
import ClientRepository from "../repositories/client.repository";
import ClientAdmFacade from "./client-adm.facade";
import ClientAdmFacadeFactory from "../factories/facade.factory";

describe("#client_adm_facade_test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ClientModel]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const repository = new ClientRepository();
    const usecase = new AddClientUseCase(repository);
    const facade = new ClientAdmFacade({
      addUseCase: usecase,
      findUseCase: null,
    });
    const input = {
      id: "1",
      name: "John Doe",
      email: "igor@x.com",
      address: "Rua X",
    };

    await facade.add(input);

    const client = await ClientModel.findByPk("1");

    expect(client).toBeDefined();
    expect(client.name).toBe(input.name);
    expect(client.email).toBe(input.email);
    expect(client.address).toBe(input.address);
  });

  it("should find a client", async () => {
    const facade = ClientAdmFacadeFactory.create();
    const input = {
      id: "1",
      name: "John Doe",
      email: "igor@x.com",
      address: "Rua X",
    };

    await facade.add(input);

    const client = await ClientModel.findByPk("1");

    expect(client).toBeDefined();
    expect(client.name).toBe(input.name);
    expect(client.email).toBe(input.email);
    expect(client.address).toBe(input.address);
  });
});
