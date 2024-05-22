const multer = require("multer");
const path = require("path");

// Function to handle file upload
const handleUpload = (subfolder = "") => {
  // Set up multer storage
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = path.join("uploads", subfolder);
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix =
        file.fieldname +
        "-" +
        Date.now() +
        "-" +
        Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });

  return multer({ storage: storage });
};

module.exports = handleUpload;
