'use strict'
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
        this.client.connect(`${this.url+this.port}`, (err,db) => {
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
             dbo.collection(`${collection}`).find(query).toArray((error, object) => {
                 if(object.length > 1)
                     return element(object);

                 return element(object[0]);
                 db.close();
             })
         });
    }

    update(collection, query, callback) {
        return this.client.connect(`${this.url + this.port}`, async (err, db) => {
            if (err) throw err;
            let dbo = db.db("myDatabase");
            const { familyID, Money } = query;

            let doc = await dbo.collection(`${collection}`).findOne({_id: familyID});
            const filter = {Money: doc.Money};
            const newMoneyVal = parseFloat(filter.Money) + parseFloat(Money);
            await dbo.collection(`${collection}`).updateOne(filter, {$set: {Money: newMoneyVal}},{ upsert: true });
            const data = (new Date().toString().split("GMT+"))[0];
            const element = {price: Money, nickName: 'SuperAdmin', date: data, familyID: ObjectId(familyID), details: `zmiana wartości o ${Money}`.toString()}


            const newValue = await expenses.notNullValid(element);
            let flag = true;

            newValue.forEach((elem => {
                if(elem === false)
                    flag = false
            }));

            if(flag)
                await dbo.collection(`${expenses.collection}`).insertOne(element);

            callback(true);
            db.close();

        });
    }
}

module.exports = { mongo : new MongoDB() };