'use strict';
const MongoClient = require('mongodb').MongoClient;
const { expenses } = require('./../../model/expenses');
const ObjectId = require('mongodb').ObjectId;

class MongoDB {
    constructor () {
        this.port = process.env.PORT_MONGODB;
        this.url = process.env.URL_MONGODB;
        this.client = MongoClient;
        this.collection = ["Family", "Users", "Expenses"];
        this.tempArray = [];
        this.db = this.openConnect();
        this.dbClose;
    }

    openConnect() {
        this.client.connect(`${this.url + this.port}`, (err, db) => {
            if (err) throw err;
            this.dbClose = db;
            this.db = db.db('myDatabase');
        })
    }

    run() {
        this.client.connect(`${this.url+this.port}`, (err,db) => {
            if (err) throw err;

            let dbo = db.db("myDatabase");
            this.collection.forEach(singleElement => {
                dbo.createCollection(singleElement, (err, res) => {
                    if(err)
                    if (err.codeName !== 'NamespaceExists') {
                        throw err;
                    } else {
                        console.log(`INFO:  ${err.codeName} [${singleElement}]`)
                    }
                });
            })
        })
    }

    search(collection, query, element) {
         return this.client.connect(`${this.url + this.port}`, (err, db) => {
             if (err) throw err;
             let dbo = db.db("myDatabase");
             dbo.collection(`${collection}`).find(query).sort({date: -1}).toArray((error, object) => {

                if(object.length < 1)
                    return element({message: "Not Found"});

                if(object.length > 1) {
                    return element(object);
                } else {
                    return element(object[0]);
                }
                db.close();
             })
         });
    }

    update(collection, query, callback, user, description) {
        return this.client.connect(`${this.url + this.port}`, async (err, db) => {
            if (err) throw err;
            let dbo = db.db("myDatabase");
            const { familyID, Money } = query;

            let doc = await dbo.collection(`${collection}`).findOne({_id: familyID});
            const filter = {Money: doc.Money};
            const newMoneyVal = parseFloat(filter.Money) + parseFloat(Money);

            if(newMoneyVal < 0) {
                callback(false);
                return false;
            }

            try {
                await dbo.collection(`${collection}`).updateOne(filter, {$set: {Money: newMoneyVal}}, {upsert: true});
            } catch (e) {
                console.log(e)
            }

            const data = (new Date().toString().split("GMT+"))[0];

            if(user === null)
                user = 'SuperAdmin';

            if(description === null)
                description = `zmiana wartości o ${Money}`;

            const element = {price: Money, nickName: user, date: data, familyID: ObjectId(familyID), details: description.toString()}

            const newValue = await expenses.notNullValid(element);
            let flag = true;

            newValue.forEach((elem => {
                if(elem === false)
                    flag = false
            }));

            if(flag) {
                try {
                    await dbo.collection(`${expenses.collection}`).insertOne(element);
                } catch (e) {
                    console.log(e)
                }
            }

            callback(true);
            db.close();
        });
    }
}

module.exports = { mongo : new MongoDB() };