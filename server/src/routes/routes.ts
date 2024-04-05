import { Router } from "express";
import { Home, Profile, login, signup } from "../controllers/controllers.js"
import { checkAuthToken } from "../middlewares/Auth.js";
const router: Router = Router();

router.route("/").get(Home)
router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/profile").get(checkAuthToken, Profile);

export default router;
