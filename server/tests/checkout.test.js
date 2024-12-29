const mongoose = require("mongoose");
const { addOrder } = require('../controllers/orderController');
const { Order } = require('../models/orderModel');

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

const object = {
        "_id" : "65d6129033192b070a1a18cd"
}
const _id = mongoose.Types.ObjectId(object._id);

let test_order = {
    orderNo: 5102,
    customerId: _id,
    customerName: "John Doe",
    orderType: "Pickup",
    pickupDateTime: "2024-02-17T23:38:36.309+00:00",
    contactNo: "998-555-1234",
    Status: "Ready for Pickup",
    Products: []
}

let wrong_order = {
    orderNo: 1239
}

describe('Checkout tests', () => {

    test("Tests if order can be sent to the database", async () => {
        expect.assertions(1);
        addOrder(test_order).then(res => {
            expect(res.status).toBe(200);
        })

    });
    test("Tests if database blocks incorrect order format", async () => {
        expect.assertions(1);
        return expect(addOrder(test_order)).rejects.toBe('Invalid order')

    });

})