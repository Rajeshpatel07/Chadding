import { Router } from "express";
import { Home, Profile, login, signup } from "../controllers/controllers.js"
import { checkAuthToken } from "../middlewares/Jwt.js";
import { AddVideo, GetVideo } from "../controllers/video.controllers.js";
import { getUser, getUserVideos } from "../controllers/user.controllers.js";
const router: Router = Router();

router.route("/").get(Home)
router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/profile").get(checkAuthToken, Profile);

router.route("/user/:username").get(getUser)
router.route("/user/videos/:id").get(getUserVideos)

router.route("/video/:Id").get(GetVideo)
router.route("/video").post(AddVideo)

export default router;
