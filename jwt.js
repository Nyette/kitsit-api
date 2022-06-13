const { auth } = require("express-oauth2-jwt-bearer");

const checkJwt = auth({
	audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
	issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
});

module.exports = { checkJwt };