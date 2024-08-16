const jwt = require('jsonwebtoken');

const generateAccessToken = async (id, username) => {
    try {
        const payload = {
            id: id,
            user: username
        };

        const secretKey = process.env.ACCESS_TOKEN_SECRET;
        const expiryTime = process.env.ACCESS_TOKEN_EXPIRY;

        return await jwt.sign(payload, secretKey, { expiresIn: expiryTime });
    } catch (error) {
        console.error('Error generating access token:', error);
        throw new Error('Token generation failed');
    }
};

module.exports = {
    generateAccessToken
};
