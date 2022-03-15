import apiProductsInstance from './utils/apiProductsInstance.js'

class ProductsRepository {
    getById(productId) {
        return apiProductsInstance.get(`/${productId}/`)
            .then(product => product.data)
            .catch(err => {
                if(err.response.data.code == 'not_found')
                    return null

                throw err;
            });
    }
}

export default ProductsRepository