import ClientsRepository from "../Repositories/Clients/index.js"

import AutheticateService from "../Services/authenticate.js"

const clientsRepository = new ClientsRepository();

const authenticateService = new AutheticateService({ clientsRepository });

class AuthController {
    async auth(req, res) {
        const clientEmail = req.body.email;

        const clientAuthInfo = await authenticateService.handle(clientEmail);
        
        return res.send(clientAuthInfo);
    }
}

export default AuthController