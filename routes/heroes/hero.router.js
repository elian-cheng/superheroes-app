const { StatusCodes } = require("http-status-codes");
const router = require("express").Router();

const heroService = require("./hero.service");
const { hero } = require("../../utils/validation/schemas");
const { validator } = require("../../utils/validation/validator");

router.get("/", async (req, res) => {
  try {
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;
    const heroesData = await heroService.getAll(skip, limit);
    res.status(StatusCodes.OK).send(heroesData);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const hero = await heroService.getOne(req.params.id);
    res.status(StatusCodes.OK).send(hero);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
});

router.post("/", validator(hero, "body"), async (req, res) => {
  const hero = await heroService.save(req.body);
  res.status(StatusCodes.OK).send(hero);
});

router.put("/:id", validator(hero, "body"), async (req, res) => {
  const hero = await heroService.update(req.params.id, req.body);
  res.status(StatusCodes.OK).send(hero);
});

router.delete("/:id", async (req, res) => {
  await heroService.remove(req.params.id);
  res.sendStatus(StatusCodes.NO_CONTENT);
});

module.exports = router;