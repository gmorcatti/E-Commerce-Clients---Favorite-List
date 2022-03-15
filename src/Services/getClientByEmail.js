import AppError from "../Errors/AppError.js";

class GetClientByEmailService {
    constructor({ clientsRepository }) {
        this.clientsRepository = clientsRepository;
    }

    async handle(clientEmail) {
        if(!clientEmail) throw new AppError('Inform the Client Email');

        const client = await this.clientsRepository.getByEmail(clientEmail);

        if(!client[0]) throw new AppError("Client doesn't exist.");

        return client[0];
    }
}

export default GetClientByEmailService