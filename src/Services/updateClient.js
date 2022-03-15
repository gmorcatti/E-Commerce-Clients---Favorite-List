import AppError from "../Errors/AppError.js";

class UpdateClientService {
    constructor({ clientsRepository }) {
        this.clientsRepository = clientsRepository;
    }

    async handle(clientId, client) {
        client = {
            name: client.name,
            email: client.email,
        }

        const databaseClient = await this.clientsRepository.getById(clientId);
        if(!databaseClient[0]) throw new AppError("Client doesn't exist.");

        const clientWithEmail = await this.clientsRepository.getByEmail(client.email);
        if(clientWithEmail[0] && clientWithEmail[0]._id != clientId)
            throw new AppError('A client with this e-mail already exists.');

        await this.clientsRepository.updateById(clientId, client);

        return {
            id: clientId,
            ...client,
        }
    }
}

export default UpdateClientService