const firebaseSecrets = JSON.parse(process.env.FIREBASE_SECRETS);

const { cert, initializeApp } = require("firebase-admin/app");

const firebaseApp = initializeApp({
	credential: cert(firebaseSecrets),
	databaseURL: `https://${process.env.DB_NAME}.firebaseio.com/`,
	databaseAuthVariableOverride: null
});

const { getDatabase } = require("firebase-admin/database");

const db = getDatabase(firebaseApp);

module.exports = db;
