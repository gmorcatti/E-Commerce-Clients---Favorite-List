import AppError from "../Errors/AppError.js";

class InsertFavoriteProductService {
    constructor({ clientsRepository, productsRepository }) {
        this.clientsRepository = clientsRepository;
        this.productsRepository = productsRepository;
    }

    async handle(clientId, productId) {
        const client = await this.clientsRepository.getById(clientId);
        if(!client[0]) throw new AppError("Client doesn't exist.");

        const product = await this.productsRepository.getById(productId);
        if(!product) throw new AppError("Product doesn't exist.");

        const { favoriteProducts } = client[0];
        
        const productIsAlreadyFavorite = favoriteProducts.some(product => product === productId);
        if(productIsAlreadyFavorite)
            throw new AppError("Product is already favorite for this client.");

        favoriteProducts.push(productId);

        await this.clientsRepository.updateFavoriteProductsList(
        clientId,
        favoriteProducts
        );

        return product;
    }
}

export default InsertFavoriteProductService