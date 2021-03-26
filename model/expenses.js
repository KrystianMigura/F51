const expense = [
    {name: "price", type: "string", required: true },
    {name: "nickName", type: "string", required: true },
    {name: "date", type: "string", required: true },
    {name: "familyID", type: "object", required: true }, // zmiana na true
    {name: "details", type: "string", required: false }
];

class Expenses {
    constructor() {
        this.expense = expense;
        this.collection = "Expenses";
    }

    async notNullValid(elem) {
        return this.expense.map(singleElement => {
            if(typeof elem[`${singleElement.name}`] === singleElement.type) {
                if (singleElement.required) {
                    return (elem[`${singleElement.name}`]) ? true : false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        });
    };



}

module.exports = { expenses : new Expenses() };