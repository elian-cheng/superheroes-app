const heroesRepo = require("./hero.db.repository");

const getAll = async (skip, limit) => await heroesRepo.getHeroes(skip, limit);

const getOne = async id => await heroesRepo.getHero(id);

const save = async hero => await heroesRepo.createHero(hero);

const update = async (id, hero) => await heroesRepo.updateHero(id, hero);

const remove = async id => await heroesRepo.deleteHero(id);

module.exports = { getAll, getOne, save, update, remove };
