const { BAD_REQUEST_ERROR } = require("../errors/appErrors");
const multer = require("multer");
const multerImageHandler = require("../utils/images/multer");

exports.checkFileMiddleware = async (req, res, next) => {
  try {
    if (!req.body.img && req.files.length === 0) {
      next();
      return;
    }

    let images = [];

    if (req.body.img) {
      if (typeof req.body.img === "string") {
        images.push(req.body.img);
      } else {
        images = req.body.img;
      }
    }

    if (req.files.length > 0) {
      const files = req.files;

      for (let file of files) {
        images.push(file.path);
      }
    }

    req.body.images = images;

    next();
  } catch (err) {
    console.log(err);
    throw new BAD_REQUEST_ERROR("Something went wrong.");
  }
};

exports.multerMiddleware = multer({
  storage: multerImageHandler
}).array("img");
