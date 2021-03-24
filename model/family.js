'use strict';

const family = [
    {name: "FamilyName", type: "string", required: true },
    {name: "Money", type: "number", required: true },
];

class Family {
    constructor() {
        this.family = family;
        this.collection = "Family";
    }

    async notNullValid(elem) {

        return this.family.map(singleElement => {
            console.log(typeof elem[`${singleElement.name}`], "<><><><>" , singleElement.type)
            if(typeof elem[`${singleElement.name}`] === singleElement.type) {
                if (singleElement.required) {
                    return (elem[`${singleElement.name}`]) ? true : false;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        });
    };

    async money(elem) {
        return (typeof elem === "number")? true : false;
    }
}

module.exports = { family : new Family()};