'use strict';
const user = [
    {name: "firstName", type: "string", required: true },
    {name: "lastName", type: "string", required: true },
    {name: "nickName", type: "string", required: true },
    {name: "email", type: "string", required: true },
    {name: "password", type: "string", required: true },
    {name: "familyId", type: "string", required: true }, // zmiana na true
    {name: "accountType", type: "string", required: false }
];

class Users {
    constructor() {
        this.user = user;
        this.collection = "Users";
        this.re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    }

    async emailValidation(email) {
        return this.re.test(String(email).toLowerCase());
    };

    async notNullValid(elem) {
        return this.user.map(singleElement => {
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
}

module.exports = { users : new Users()};