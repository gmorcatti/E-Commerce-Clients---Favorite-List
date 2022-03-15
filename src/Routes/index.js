import clientsRoutes from "./clientsRoutes.js";
import authRoutes from "./authRoutes.js";

const routes = (app) => {
    app.use('/client', clientsRoutes);
    app.use('/auth', authRoutes);
}

export default routes;