const { StatusCodes } = require("http-status-codes");
const router = require("express").Router();

const heroService = require("./hero.service");
const { hero } = require("../../utils/validation/schemas");
const { validator } = require("../../utils/validation/validator");
const { multerMiddleware, checkFileMiddleware } = require("../../middleware/imagesMiddleware");

router.get("/", async (req, res) => {
  try {
    let { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;
    const heroes = await heroService.getAll(skip, limit);
    res.status(StatusCodes.OK).send(heroes);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
});

router.post(
  "/",
  multerMiddleware,
  checkFileMiddleware,
  validator(hero, "body"),
  async (req, res) => {
    const hero = await heroService.save(req.body);
    res.status(StatusCodes.OK).send(hero);
  }
);

router.put(
  "/:id",
  multerMiddleware,
  checkFileMiddleware,
  validator(hero, "body"),
  async (req, res) => {
    const hero = await heroService.update(req.body);
    res.status(StatusCodes.OK).send(hero);
  }
);

router.delete("/:id", async (req, res) => {
  await heroService.remove(req.params.id);
  res.sendStatus(StatusCodes.NO_CONTENT);
});

module.exports = router;
