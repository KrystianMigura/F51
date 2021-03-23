'use strict'
const MongoClient = require('mongodb').MongoClient;


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
                 return element(object[0])
                 db.close();
             })





         });
    }
}

module.exports = {mongo : new MongoDB()}