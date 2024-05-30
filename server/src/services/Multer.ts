import multer from "multer";
import path from "path";

// Define the storage configuration
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    let uploadPath = './Storage';
    if (file.mimetype.startsWith('image/')) {
      uploadPath = path.join(uploadPath, 'Images');
    } else if (file.mimetype.startsWith('video/') || file.mimetype === 'application/octet-stream') {
      uploadPath = path.join(uploadPath, 'Videos');
    } else {
      return cb(new Error('Unsupported file type'), '');
    }
    cb(null, uploadPath);
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Create the upload middleware for multiple fields
const upload = multer({ storage: storage });

 const uploadFields = upload.fields([
  { name: 'video', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]);

export default uploadFields;
