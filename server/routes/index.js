import { Router } from "express"
import userRouter from "./userRouter.js"
import todoRouter from "./todoRouter.js"

const router = new Router()

router.use("/user", userRouter)
router.use("/task", todoRouter)

export default router