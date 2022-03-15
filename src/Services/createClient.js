import AppError from "../Errors/AppError.js";

class CreateClientService {
    constructor({ clientsRepository }) {
        this.clientsRepository = clientsRepository;
    }

    async handle(client) {
        client = {
            name: client.name,
            email: client.email,
        }

        if(!client.name) throw new AppError('Inform the Client Name');
        if(!client.email) throw new AppError('Inform the Client Email');

        const databaseClient = await this.clientsRepository.getByEmail(client.email);

        if(databaseClient[0]) throw new AppError('Client already exists.');
        
        return await this.clientsRepository.create(client);
    }
}

export default CreateClientService