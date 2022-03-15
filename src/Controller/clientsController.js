import ClientsRepository from "../Repositories/Clients/index.js"
import ProductsRepository from "../Repositories/Products/index.js"

import CreateClientService from "../Services/createClient.js"
import UpdateClientService from "../Services/updateClient.js"
import GetClientByEmailService from "../Services/getClientByEmail.js"
import RemoveClientService from "../Services/removeClient.js"
import InsertFavoriteProductService from "../Services/insertFavoriteProduct.js"
import RemoveFavoriteProductService from "../Services/removeFavoriteProduct.js"

const clientsRepository = new ClientsRepository();
const productsRepository = new ProductsRepository();

const createClientService = new CreateClientService({ clientsRepository });
const updateClientService = new UpdateClientService({ clientsRepository });
const getClientByEmailService = new GetClientByEmailService({ clientsRepository });
const removeClientService = new RemoveClientService({ clientsRepository });
const insertFavoriteProductService = new InsertFavoriteProductService({
    clientsRepository,
    productsRepository,
});
const removeFavoriteProductService = new RemoveFavoriteProductService({
    clientsRepository,
    productsRepository,
});

const { ADMIN_EMAIL } = process.env;

class ClientsController {
    async create(req, res) {
        const client = req.body;

        const createdClient = await createClientService.handle(client);
        
        return res.status(201).send(createdClient);
    }

    async createAdmin(req, res) {
        const client = {
            name: 'Admin',
            email: ADMIN_EMAIL
        };

        const createdClient = await createClientService.handle(client);
        
        return res.status(201).send(createdClient);
    }

    async update(req, res) {
        const client = req.body;
        const clientId = req.params.id;

        const updatedClient = await updateClientService.handle(clientId, client);

        return res.send(updatedClient);
    }

    async remove(req, res) {
        const clientId = req.params.id;

        await removeClientService.handle(clientId);

        return res.status(202).send()
    }

    async getByEmail(req, res) {
        const clientEmail = req.params.email;

        const client = await getClientByEmailService.handle(clientEmail);

        return res.send(client);
    }

    async insertFavoriteProduct(req, res) {
        const clientId = req.clientId;
        const productId = req.params.productId;

        const updatedInfo = await insertFavoriteProductService.handle(clientId, productId);

        return res.status(201).send(updatedInfo);
    }

    async removeFavoriteProduct(req, res) {
        const clientId = req.clientId;
        const productId = req.params.productId;
        
        const updatedInfo = await removeFavoriteProductService.handle(clientId, productId);

        return res.status(200).send(updatedInfo);
    }
}

export default ClientsController