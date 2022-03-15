import AppError from "../Errors/AppError.js";

class RemoveClientService {
    constructor({ clientsRepository }) {
        this.clientsRepository = clientsRepository;
    }

    async handle(clientId) {
        if(!clientId) throw new AppError('Inform the Client ID');
        
        const clientIdIsValid = this.clientsRepository.isValidObjectId(clientId);
        if(!clientIdIsValid) throw new AppError('Please, Insert a valid Client Id.');

        const databaseClient = await this.clientsRepository.getById(clientId);
        if(!databaseClient[0]) throw new AppError("Client doesn't exist.");

        await this.clientsRepository.removeById(clientId);
        
        return;
    }
}

export default RemoveClientService