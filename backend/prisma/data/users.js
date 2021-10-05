const faker = require("faker");

function generateUserData(
    count = 50
) {
    const data = [];
    for (let index = 0; index < count; index++) {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const input = {
            id: faker.datatype.uuid(),
            email: faker.internet.email(firstName, lastName),
            image: faker.internet.avatar(),
            name: faker.name.findName(firstName, lastName),
            role: "USER",
            status: "ACTIVE",
        };
        data.push(input);
    }

    return data;
}

module.exports = {
    generateUserData
}