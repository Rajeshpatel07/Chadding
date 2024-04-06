import { Router } from "express";
import { Home, Profile, login, signup } from "../controllers/user.controllers.js"
import { checkAuthToken } from "../middlewares/Auth.js";
import { AddVideo } from "../controllers/video.controllers.js";
const router: Router = Router();

router.route("/").get(Home)
router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/profile").get(checkAuthToken, Profile);


router.route("/video").get(AddVideo)

export default router;
