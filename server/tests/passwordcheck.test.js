const mongoose = require("mongoose");
const { getUser, changePw } = require('../controllers/userController');
const { User } = require('../models/orderModel');

const object = {
    "_id" : "65d6129033192b070a1a18cd"
}
const _id = mongoose.Types.ObjectId(object._id);
const new_pw = "newerpw";

describe('Password tests', () => {

    test("Tests if user password is updated", async () => {
        expect.assertions(1);

        changePw(_id, new_pw).then(res => {
            getUser({ '_id': _id }).then((data) => {
                storedPw = data[secret];
                expect(storedPw).toBe(new_pw);
            })
        })

    });

    test("Tests if user password is updated", async () => {

        getUser({ '_id': _id }).then((data) => {
            storedPw = data[secret];
            expect(storedPw).not.toBe(new_pw);
        })
        
    })

})