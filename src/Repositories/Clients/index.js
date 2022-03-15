import mongoose from "mongoose";
import Client from "../../Model/clientsModel.js"

class ClientsRepository {
    isValidObjectId(objectId) {
        return mongoose.Types.ObjectId.isValid(objectId);
    }

    create(clientData) {
        const client = new Client(clientData);
        return Client.create(client)
    }

    updateById(clientId, clientData) {
        return Client.findByIdAndUpdate(
            clientId, 
            clientData
        );
    }

    updateByEmail(clientEmail, clientData) {
        return Client.updateOne(
            { email: clientEmail }, 
            clientData
        );
    }

    getById(clientId) {
        return Client.find({ _id: clientId });
    }

    getByEmail(clientEmail) {
        return Client.find({ email: clientEmail });
    }

    removeById(clientId) {
        return Client.deleteOne({ _id: clientId })
    }

    removeByEmail(clientEmail) {
        return Client.deleteOne({ email: clientEmail })
    }

    updateFavoriteProductsList(clientId, favoriteProductsList) {
        return Client.updateOne(
            { id: clientId }, 
            { favoriteProducts: favoriteProductsList }
        );
    }
}

export default ClientsRepository