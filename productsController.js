// productsController.js - Controler for managing product functionality in the api.

import ProductModel from '../models/productModel';

const getProducts = async (req, res) => {
    try {
        const products = await ProductModel.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json( { error: 'Products not found' });
    }
};

export { getProducts };
