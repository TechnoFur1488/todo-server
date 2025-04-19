import Router from "express"
import userControllers from "../controllers/userControllers.js"

const router = Router()

router.post("/registration", userControllers.registration)
router.post("/login", userControllers.login)

export default router