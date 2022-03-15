import jwt from 'jsonwebtoken';

import AppError from '../Errors/AppError.js';

/* This method was created just to facilitate the authorization tests (simulating a Admin User)
    Obviously it won't be used in a Production Environment.
    The purpose is just allow the tester to create a admin user, the other routes need the token to execute.
*/
function checkIsAdmin(body, endpoint, method) {
    const isAdminEmail = body.email == process.env.ADMIN_EMAIL;
    const isCreateRoute = endpoint == '/client' && method == 'POST';
    if (isAdminEmail && isCreateRoute)
        return true;
}

class AuthMiddleware {

    auth(req, _, next) {
        const isAdmin = checkIsAdmin(req.body, req.baseUrl, req.method);

        if (isAdmin) {
            req.clientRole = 'ADMIN';
            return next();
        }

        const authHeader = req.headers.authorization;

        if (!authHeader)
            throw new AppError('No token provided', 401);

        const parts = authHeader.split(' ');

        if (parts.length !== 2)
            throw new AppError('Token Error', 401);

        const [scheme, token] = parts;

        if (!/^Bearer$/.test(scheme))
            throw new AppError('Token malformated', 401);

        jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
            if (err) throw new AppError('Token Invalid', 401);

            req.clientId = decoded.id;
            req.clientRole = decoded.role;
            next();
        });
    }

    authorizeAdmin(req, _, next) {
        if (req.clientRole != 'ADMIN')
            throw new AppError('Not Allowed')

        next();
    }
}

export default AuthMiddleware