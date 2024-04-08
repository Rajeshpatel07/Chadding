import multer from "multer";

const upload=multer({
    dest:"../Storage/"
})

export default upload;
