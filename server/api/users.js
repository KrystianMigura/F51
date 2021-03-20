'use strict';
const { users } = require('../../model/users');
const { mongo } = require('../DB/DB');
let flag = true;

async function findAdmin(req, res) {
    const database = mongo.db;
    database.collection(`${users.collection}`).find({"accountType": "SuperAdmin"}).toArray((error, object) => {
        if(error) {
            res.status(500).send({message: "Error"});
            console.log(error)
            mongo.dbClose.close();
        } else {
            res.status(200).send({size: object.length});
        }
    })
}

async function findEmail(email, callback) {
    const database = mongo.db;
     database.collection(`${users.collection}`).find({"email": email}).toArray((error, object) => {
        if(error) {
            callback(error);
        } else {
            callback(object)
        }
    });
}

async function createAdmin(req, res) {
    flag = true;
    const { email, firstName, lastName, nickName, password } = req.body;
    const validEmail = await users.emailValidation(email);
    const valid = await users.notNullValid(req.body);

    if(validEmail) {
        const value = valid.map((a, b) => {
            if (users.user[b].required !== a) {
                return false;
            }
            if (valid.length - 1 === b)
                return true;
        });

        value.forEach(x => {
            if(x === false) {
                flag = false;

            }
        });

        if(flag)
        await findEmail(email,(x) => {
            if(x.length !== 0) {
                res.status(201).send({message: "taki email juz istnieje"})
            }else {
                const database = mongo.db;
                database.collection(`${users.collection}`).insertOne({"firstName": firstName, "lastName": lastName, "nickName":nickName, "password": password, "email": email, "familyID": null, "accountType": "SuperAdmin"})
                res.status(201).send({message: "Konto zostało stworzone"})
            }
        });
    } else {
        res.status(200).send({value: "Zły adres mailowy"})
    }


    //
    // const validFirstName = await users.notNullValid(firstName);
    // const validLastName = await users.notNullValid(lastName);
    // const validNickName = await users.notNullValid(nickName);
    // const validPassword = await users.notNullValid(password);


    // if(validEmail && validLastName && validLastName && validNickName && validPassword && validFirstName)


    // const response = {
    //     email: validEmail,
    //     firstName: validFirstName,
    //     lastName: validLastName,
    //     nickName: validNickName,
    //     password: validPassword
    // };
    // res.status(200).send(valid)
}


module.exports = { findAdmin, createAdmin };