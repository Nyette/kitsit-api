const express = require("express");

const router = express.Router();

const { checkJwt } = require("../jwt");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/", async (req, res) => {
	try {
		const allCats = await prisma.cat.findMany();
		res.status(200).json({
			cats: allCats
		});
	} catch (e) {
		res.status(500).json({
			message: "There was an error. Please contact the admin."
		});
	} finally {
		await prisma.$disconnect();
	}
});

router.post("/", checkJwt, async (req, res) => {
	try {
		const newCat = await prisma.cat.create({
			data: {
				owner_id: req.body.owner_id,
				name: req.body.name,
				fur_pattern: req.body.fur_pattern
			}
		});
		res.status(200).json({
			cat: newCat
		});
	} catch (e) {
		res.status(500).json({
			message: "There was an error. Please contact the admin."
		});
	} finally {
		await prisma.$disconnect();
	}
});

router.get("/:id", async (req, res) => {
	try {
		const savedCat = await prisma.cat.findMany({
			where: {
				id: Number(req.params.id)
			}
		});
		res.status(200).json({
			cat: savedCat
		});
	} catch (e) {
		res.status(500).json({
			message: "There was an error. Please contact the admin."
		});
	} finally {
		await prisma.$disconnect();
	}
});

router.patch("/:id", checkJwt, async (req, res) => {
	try {
		const updatedCat = await prisma.cat.update({
			where: {
				id: Number(req.params.id)
			},
			data: {
				name: req.body.name,
				fur_pattern: req.body.fur_pattern,
				happiness: req.body.happiness
			}
		});
		res.status(200).json({
			cat: updatedCat
		});
	} catch (e) {
		res.status(500).json({
			message: "There was an error. Please contact the admin."
		});
	} finally {
		await prisma.$disconnect();
	}
});

router.delete("/:id", checkJwt, async (req, res) => {
	try {
		await prisma.cat.delete({
			where: {
				id: Number(req.params.id)
			}
		});
		res.status(200).json({
			message: "Your cat was deleted."
		});
	} catch (e) {
		res.status(500).json({
			message: "There was an error. Please contact the admin."
		});
	} finally {
		await prisma.$disconnect();
	}
});

module.exports = router;