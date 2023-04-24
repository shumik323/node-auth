const uuid = require('uuid');

const generateActivationLink = () => uuid.v4();

module.exports = generateActivationLink;