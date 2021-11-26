// Firebase

const firebaseSecrets = JSON.parse(process.env.FIREBASE_SECRETS);

const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(firebaseSecrets)
});

// JWT

const jwt = require("express-jwt");

const jwks = require("jwks-rsa");

const checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"]
});

// Routes

const express = require("express");

const router = express.Router();

router.post("/firebase", checkJwt, async (req, res) => {
  const uid = req.body.userId;
  try {
    const customToken = await admin.auth().createCustomToken(uid);
    res.json({
      firebaseToken: customToken
    });
  } catch (e) {
    res.status(500).json({
      error: e
    });
  }
});

module.exports = router;