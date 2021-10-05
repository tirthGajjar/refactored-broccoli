const faker = require("faker");

function generateProductData() {
    const data = {
        id: faker.datatype.uuid(),
        name: "The Minimalist Entrepreneur",
        slug: "the-minimalist-entrepreneur",
    };

    return data;
}

module.exports = {
    generateProductData
}