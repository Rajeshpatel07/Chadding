import { Router } from "express";
import { Home, Profile, login, signup } from "../controllers/controllers.js"
import { checkAuthToken } from "../middlewares/Jwt.js";
import { AddVideo, GetVideo, viewer, broadcast, getLiveStreams, endStream, stopViewer } from "../controllers/video.controllers.js";
import { getUser, getUserVideos, UpdateProfile } from "../controllers/user.controllers.js";
import uploadFields from "../services/Multer.js"


const router: Router = Router();

router.route("/").get(checkAuthToken, Home);
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/profile/:Id").get(checkAuthToken, Profile);

router.route("/user/:Id").get(getUser);
router.route("/user/videos/:Id").get(getUserVideos);
router.route("/user/updateprofile").put(UpdateProfile);

router.route("/video/:Id").get(GetVideo);
router.route("/video").post(uploadFields, AddVideo);
router.route("/livestreams").get(getLiveStreams);

router.route("/broadcast").post(broadcast);
router.route("/viewer").post(viewer);
router.route('/stopstream').post(endStream);
router.route('/stopviewer').post(stopViewer);

export default router;
