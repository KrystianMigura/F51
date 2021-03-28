'use strict';
const { users } = require('../../model/users');
const { family } = require('../../model/family');
const { mongo } = require('../DB/DB');
const ObjectId = require('mongodb').ObjectId;
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
    const database = mongo.db;
    let familyID;
    flag = true;
    const { email, firstName, lastName, nickName, password } = req.body;
    const validEmail = await users.emailValidation(email);

    if(req.body.accountType === "the_head_of_the_family") {
        const familyValue = {
            FamilyName: lastName,
            Money: 1000
        };

        // const notNull = await family.notNullValid(familyValue);
        // const familyStartMoney = await family.money(parseFloat(familyValue.Money));
        try {
            familyID = (await database.collection(`${family.collection}`).insertOne({
                "FamilyName": familyValue.FamilyName,
                "Money": familyValue.Money
            })).ops[0]._id;
        } catch (e) {
            console.log(e)
        }

    } else {
        familyID = new ObjectId(req.body.familyID);
    }

    req.body.familyId = familyID.toString();
    const valid = await users.notNullValid(req.body);

    if(validEmail) {
        const value = valid.map((a, b) => {
            if (users.user[b].required !== a) {
                console.log(users.user[b].required, "<><><><>" ,a, users.user[b]); // gdzie wystepuje problem z walidacja
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

        if(!flag)
            res.status(500).send({message: "internal server error"});

        if(flag)
        await findEmail(email,async (x) => {
            if(x.length !== 0) {
                try {
                await database.collection(`${family.collection}`).remove({_id: familyID});
                } catch (e) {
                    console.log(e);
                    res.status(400).send({message: "Error remove"});
                }
                res.status(201).send({valid: true, message: "taki email juz istnieje"})
            } else {
                try {
                    database.collection(`${users.collection}`).insertOne({"firstName": firstName, "lastName": lastName, "nickName":nickName, "password": password, "email": email, "familyID": new Object(familyID), "accountType": (req.body.accountType)? req.body.accountType : "SuperAdmin"})
                } catch (e) {
                    console.log(e);
                    res.status(400).send({message: "Error insert"})
                }
                res.status(201).send({valid: false, message: "Konto zostało stworzone"})
            }
        });
    } else {
        res.status(200).send({value: "Zły adres mailowy"})
    }
}


module.exports = { findAdmin, createAdmin };