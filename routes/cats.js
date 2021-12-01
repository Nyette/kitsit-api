const express = require("express");

const router = express.Router();

const db = require("../firebase");

router.post("/", (req, res) => {
	const catsRef = db.ref("/").child("cats");
	if ("furPattern" in req.body) {
		const catRef = catsRef.push({
			ownerId: req.body.ownerId,
			name: req.body.name,
			furPattern: req.body.furPattern,
			happiness: 65,
		});
		catRef.once("value", (catSnapshot) => {
			const newCat = catSnapshot.val();
			res.status(200).json({
				cat: newCat
			});
		});
	} else {
		catsRef.orderByChild("ownerId").equalTo(req.body.ownerId).on("value", (catSnapshot) => {
			const savedCat = catSnapshot.val();
			if (savedCat) {
				res.status(200).json({
					cat: savedCat
				});
			} else {
				res.status(200).json({
					cat: null
				});
			}
		});
	}
});

router.patch("/:id", (req, res) => {
	const catsRef = db.ref("/").child("cats");
	const catRef = catsRef.child(req.params.id);
	catRef.update(req.body);
	catRef.once("value", (catSnapshot) => {
		const updatedCat = catSnapshot.val();
		res.status(200).json({
			cat: updatedCat
		});
	});
});

router.delete("/:id", (req, res) => {
	const catsRef = db.ref("/").child("cats");
	const catRef = catsRef.child(req.params.id);
	catRef.set(null);
	res.status(200).json({
		cat: null
	});
});

module.exports = router;