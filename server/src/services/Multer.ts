
import multer from "multer";

const upload = multer({
  storage: multer.diskStorage({
    destination: function(req, res, cd) {
      cd(null, './Storage/')
    },
    filename: function(req, file, cd) {
      cd(null, `${Date.now()}-${file.originalname}`)
    }
  })
});

export default upload;


