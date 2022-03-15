import AppError from "../Errors/AppError.js";

class RemoveFavoriteProductService {
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
        console.log(favoriteProducts)
        const productIsFavorite = favoriteProducts.some(product => product === productId);
        if(!productIsFavorite)
            throw new AppError("This Product is not favorite for this client.");

        const productIndex = favoriteProducts.findIndex(product => product === productId);
        favoriteProducts.splice(productIndex, 1);

        await this.clientsRepository.updateFavoriteProductsList(
            clientId,
            favoriteProducts
        );

        return;
    }
}

export default RemoveFavoriteProductService