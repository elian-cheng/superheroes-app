const cloudinary = require("../../utils/images/cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { v4: uuid } = require("uuid");

const imgParams = {
  dimensions: {
    width: 500,
    height: 500
  },
  maxFileSize: 100000,
  acceptableFileTypes: ["jpg", "png", "jpeg"]
};

const multerImageHandler = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const imgName = uuid();

    return {
      folder: "superheroes",
      allowed_formats: imgParams.acceptableFileTypes,
      public_id: imgName,
      transformation: [
        {
          height: imgParams.dimensions.height,
          width: imgParams.dimensions.width,
          crop: "fill"
        }
      ],
      bytes: imgParams.maxFileSize
    };
  }
});

module.exports = multerImageHandler;
