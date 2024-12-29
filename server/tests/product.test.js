
const mongoose = require("mongoose");
const { createOrUpdateProduct, deleteProduct } = require('../controllers/productController');
const { Product } = require('../models/productModel');

mongoose
    .connect(process.env.dbConn, {})
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log(`server listening on: ${HTTP_PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

let dummy_product = {
    productName: 'Auto test',
    productDescription: 'this is a dummy document for testing',
    productPrice: 10.01,
    quantity: 50,
    categoryId: 'Fresh fruits',
    picture: [],
}

describe('Create / Update Products', () => {

    describe('Create product', () => {

        test('Product without id is created in database', () => {
            expect.assertions(1);
            createOrUpdateProduct(dummy_product).then(res => {

                Product.findOne({ 'productName': dummy_product.productName }).then((data) => {
                    dummy_product['_id'] = data['_id']
                    expect(res.status).toBe(200);
                    expect(data).toEquals(dummy_product)
                })

            });
        });

    });

    describe('Update products', () => {

        test('Product with id is updated in database', () => {
            expect.assertions(1);

            dummy_product['productName'] = 'Test update'

            createOrUpdateProduct(dummy_product).then(res => {
                
                Product.findOne({ '_id': dummy_product['_id'] }).then((data) => {

                    expect(res.status).toBe(200);
                    expect(data).toEquals(dummy_product)
                })

            });
        });

        test('Missing product name return error message', () => {
            expect.assertions(1);
            dummy_product.productName = ''
            expect(createOrUpdateProduct(dummy_product)).rejects.toBe('Invalid product - Missing product name')
        });

        test('Empty product return error message', () => {
            expect.assertions(1);

            expect(createOrUpdateProduct({})).rejects.toBe('Invalid product - Product is empty')
        });

    });

});


describe('Delete Products', () => {

    describe('Delete product', () => {

        test('Item is deleted in database', () => {
            expect.assertions(1);
            deleteProduct(dummy_product['_id']).then(res => {

                Product.findOne({ '_id': dummy_product['_id'] }).then((data) => {

                    expect(res.status).toBe(200);
                    expect(data).toBeNull()
                })
                
            });
        });

        test('Empty product id return error message', () => {
            expect.assertions(1);
            return expect(deleteProduct('')).rejects.toBe('Invalid product ID')
        });

        test('Non-existing product id return error message', () => {
            expect.assertions(1);
            product.id = '123456'
            return expect(deleteProduct(product)).rejects.toBe('Product ID not found')
        });
    });

});
