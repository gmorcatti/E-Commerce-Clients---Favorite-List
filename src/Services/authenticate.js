import jwt from 'jsonwebtoken';

import AppError from "../Errors/AppError.js";

const { ADMIN_EMAIL } = process.env;

class AuthenticateService {
    constructor({ clientsRepository }) {
        this.clientsRepository = clientsRepository;
    }

    async handle(clientEmail) {
        const client = await this.clientsRepository.getByEmail(clientEmail);

        if(!client[0]) throw new AppError("Client doesn't exist.");

        const token = this.generateToken({
            id: client[0]._id,
            role: client[0].email == ADMIN_EMAIL ? 'ADMIN' : 'USER'
        });

        return {
            token,
            client: client[0],
        }
    }

    generateToken(params = {}) {
        return jwt.sign(params, process.env.JWT_TOKEN, {
            expiresIn: 86400
        })
    }
}

export default AuthenticateService