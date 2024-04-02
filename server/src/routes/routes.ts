import { Router } from "express";
import { Home, login, signup } from "../controllers/controllers.js"

const router: Router = Router();

router.route("/").get(Home)
router.route("/signup").post(signup)
router.route("/login").post(login)

export default router;
