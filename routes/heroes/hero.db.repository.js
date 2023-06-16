const Hero = require("./hero.model");
const { NOT_FOUND_ERROR, BAD_REQUEST_ERROR } = require("../../errors/appErrors");
const ENTITY_NAME = "hero";

const getHeroes = async (skip, limit) => {
  try {
    const heroes = await Hero.find({}, "", {
      skip,
      limit: Number(limit)
    });
    const count = await Hero.count();
    const data = {
      heroes,
      count
    };
    return data;
  } catch (err) {
    throw new BAD_REQUEST_ERROR("Something went wrong.");
  }
};

const getHero = async id => {
  const hero = await Hero.findOne({ _id: id });
  if (!hero) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }

  return hero;
};

const createHero = async heroData => {
  try {
    return await Hero.create(heroData);
  } catch (err) {
    throw new BAD_REQUEST_ERROR("Something went wrong.");
  }
};

const updateHero = async (id, heroData) => {
  try {
    const hero = await Hero.findOneAndUpdate(
      { _id: id },
      { $set: heroData },
      {
        new: true
      }
    ).select({ __v: 0 });

    if (!hero) {
      throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
    }
  } catch (err) {
    throw new BAD_REQUEST_ERROR("Something went wrong");
  }
};

const deleteHero = async id => {
  try {
    const hero = await Hero.findOneAndRemove({ _id: id });

    if (!hero) {
      throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
    }
  } catch (err) {
    throw new BAD_REQUEST_ERROR("Something went wrong");
  }
};

module.exports = { getHeroes, getHero, createHero, updateHero, deleteHero };